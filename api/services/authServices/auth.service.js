import { User, SportsUser } from '../../models/authmodels/auth.model.js';
import bcryptjs from 'bcryptjs';
import { sendEmail, sendSportsEmail } from '../../../utils/email.js';
import { generateSportsToken, generateToken } from '../../../middlewares/auth.middleware.js';
import { getRedisClient } from '../../../database/redis/redis.js';
import CustomError from '../../../utils/response.js';

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

  const token = generateToken(isMatch);


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

export const getAllUsers = async () => {
  const users = await User.find({}, '-password -confirmPassword');
  if (!users || users.length === 0) {
    throw new Error('No users found');
  }
  return users;
}


export const sportsRegisterService = async ({ name, mobile, email, password, confirmPassword }) => {
  if (!name || !mobile || !email || !password || !confirmPassword) {
    throw new Error('All fields are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const existingUser = await SportsUser.findOne({ mobile });
  if (existingUser) {
    throw new Error('Mobile number already exists, please use a different mobile');
  }

  const newUser = new SportsUser({
    name,
    email,
    mobile,
    password,
  });

  await newUser.save();
  const token = generateSportsToken(newUser);

  try {
    const subject = 'Welcome to Sports League!';
    const html = `
      <h2>Welcome to Sports League, ${name}!</h2>
      <p>We’re thrilled to have you join the community of players, fans, and teams.</p>
      <p>Start exploring matches, joining teams, and tracking your stats.</p>
      <p>🏆 Let the game begin!</p>
      <br>
      <p>Best regards,<br/>Sports League Team</p>
    `;

    await sendSportsEmail(
      newUser.email,
      subject,
      'Welcome to Sports League!',
      html
    );
  } catch (error) {
    console.error('Failed to send welcome email:', error.message);
  }
  return {
    message: 'Sports user registered successfully',
    userId: newUser._id,
    token,
  };
};
export const sportsLoginService = async ({ mobile, email, password }) => {
  if ((!mobile && !email) || !password) {
    throw new Error('Either mobile or email and password are required');
  }

  let user;
  if (mobile && password) {
    user = await SportsUser.findOne({ mobile });
    if (!user) {
      throw new Error('Invalid mobile or password');
    }
  } else if (email && password) {
    user = await SportsUser.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
  } else {
    throw new Error('Invalid login credentials');
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateSportsToken(user);

  try {
    const subject = 'Sports League Login Notification';
    const html = `
      <h2>Hello, ${user.name}!</h2>
      <p>You have successfully logged in to Sports League.</p>
      <p>If this wasn't you, please contact support immediately.</p>
      <br>
      <p>Best regards,<br/>Sports League Team</p>
    `;

    await sendSportsEmail(
      user.email,
      subject,
      'You have successfully logged in.',
      html
    );
  } catch (error) {
    console.error('Failed to send login email:', error.message);
  }

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email
    }
  };
};

export const getAllSportsUsers = async () => {
  const users = await SportsUser.find({}, '-password -confirmPassword');

  if (!users || users.length === 0) {
    throw new Error('No sports users found');
  }
  const token = generateSportsToken(users);

  return {
    users,
    token
  };
};