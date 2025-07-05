
import jwt from 'jsonwebtoken';
import { getRedisClient } from '../database/redis/redis.js';
import { JWT_SECRET } from '../env.js';

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    emailaddress: user.emailaddress,
    fullname: user.fullname,
    role: user.role || 'user',
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};
export const generateSportsToken = (user) => {
  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role || 'user',
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const redisClient = getRedisClient();
    const isBlacklisted = await redisClient.get(`bl_${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been invalidated (logout)' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

