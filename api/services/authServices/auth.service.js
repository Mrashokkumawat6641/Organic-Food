import User from '../../models/authmodels/auth.model.js';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '../../../utils/email.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../../../middlewares/auth.middleware.js';
import { getRedisClient } from '../../../database/redis/redis.js';

const HASHVALUE = process.env.HASHVALUE || '10';

export const register = async ({ fullname, emailaddress, password, confirmpassword }) => {
  if (!fullname || !emailaddress || !password || !confirmpassword) {
    const error = new Error('All fields are required');
  }
  const normalizedEmail = emailaddress.toLowerCase();

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  if (password !== confirmpassword) {
    const error = new Error('Passwords do not match');
    error.status = 400;
    throw error;
  }
  if (!normalizedEmail) {
    return res.status(400).json({ message: 'Emailaddress is enter LowerCase' });
  }
  const existingUser = await User.findOne({ emailaddress: normalizedEmail });
  if (existingUser) {
    const error = new Error('Email already exists, please use a different email');
    error.status = 409;
    throw error;
  }
  const newUser = new User({
    fullname,
    emailaddress: normalizedEmail,
    password,
  });
  newUser.confirmPassword = confirmpassword;
  await newUser.save();
  const token = generateToken(newUser);

  await sendEmail(
    newUser.emailaddress,
    'Welcome!',
    'Thanks for signing up on Orgnic Food!',
    'Welcome to Organic Food, ' + newUser.fullname + '!<br>' +
    'We are excited to have you on board. You can now enjoy our wide range of organic products.<br>' +
    'Feel free to explore our website and start shopping for your favorite organic foods.<br>' +
    'If you have any questions or need assistance, our support team is here to help.<br>' +
    'Thank you for choosing Organic Food!<br>' +
    'Best regards,<br>' +
    'Organic Food Team<br>' +
    '<strong>Thanks for signing up!</strong>'
  );

  return {
    message: 'User registered successfully',
    userId: newUser._id,
    token,
  };
};

export const loginuser = async ({ emailaddress, password }) => {
  if (!emailaddress || !password) {
    throw new Error('Email and password are required');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  if (!emailaddress.includes('@', '.', '.com', '.org', '.net', '.edu', '.gov', '.co', '.io', '.biz', '.info', '.me', '.us', '.uk', '.ca', '.au', '.de', '.fr', '.jp', '.cn', '.ru', '.it', '.es', '.nl', '.se', '.no', '.fi', '.dk', '.pl', '.ch', '.be', '.at', '.pt', '.gr', '.in')) {
    throw new Error('Invalid email address format');
  }
  const normalizedEmail = emailaddress.toLowerCase();
  const user = await User.findOne({ emailaddress: normalizedEmail });
  console.log('User found:', user);
  console.log('Email address:', emailaddress);
  console.log('Normalized email:', normalizedEmail);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await user.comparePassword(password);
  console.log('Password match:', isMatch);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user._id, emailaddress: user.emailaddress },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  console.log('Generated token:', token);

  await sendEmail(
    user.emailaddress,
    'Login Notification',
    'You have successfully logged in.',
    '<strong>You have successfully logged in.</strong>'

  );
  console.log('Email sent to:', user.emailaddress);

  return {
    token,
    user: {
      id: user._id,
      emailaddress: user.emailaddress,
      name: user.fullname,
    }
  };
};

export const logoutUser = async (token, exp) => {
  const redisClient = getRedisClient();
  const ttl = exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    await redisClient.setEx(`bl_${token}`, ttl, 'blacklisted');
    console.log(`Token blacklisted for ${ttl} seconds`);
  } else {
    console.log('Token already expired');
  }
};
