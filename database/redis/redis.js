import { createClient } from 'redis';
import logger from '../../utils/logger.js';

let client;

export const connectRedis = async () => {
  try {
    client = createClient();
    client.on('error', (err) => {
      logger.error('Redis Error:', err);
    });

    await client.connect();
    logger.info('Redis connected successfully');
  } catch (error) {
    logger.error('Redis connection failed:', error);
    throw error;
  }
};
export const getRedisClient = () => {
  if (!client || !client.isOpen) {
    throw new Error('Redis client is not connected. Make sure connectRedis() is called.');
  }
  return client;
};
