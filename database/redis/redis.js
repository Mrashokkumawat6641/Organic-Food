import redis from './upstashClient.js';
import logger from '../../utils/logger.js';

export const connectRedis = async () => {
  try {
    logger.info('Redis (Upstash) client initialized successfully');
  } catch (error) {
    logger.error('Redis connection failed:', error);
    throw error;
  }
};

export const getRedisClient = () => {
  return redis;
};
