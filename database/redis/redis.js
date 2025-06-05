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


// import { createClient } from 'redis';
// import logger from '../../utils/logger.js';
// import dotenv from 'dotenv';
// dotenv.config();
// let client;

// export const connectRedis = async () => {
//   try {
//     client = createClient({
//       socket: {
//         host: process.env.REDIS_HOST,
//         port: parseInt(process.env.REDIS_PORT),
//         tls: process.env.REDIS_TLS === 'true'  // required for Upstash
//       },
//       username: process.env.REDIS_USERNAME || 'default', // optional, Upstash uses 'default'
//       password: process.env.REDIS_PASSWORD,
//     });

//     client.on('error', (err) => {
//       logger.error('Redis Error:', err);
//     });

//     await client.connect();
//     logger.info('Redis connected successfully');
//   } catch (error) {
//     logger.error('Redis connection failed:', error);
//     throw error;
//   }
// };

// export const getRedisClient = () => {
//   if (!client || !client.isOpen) {
//     throw new Error('Redis client is not connected. Make sure connectRedis() is called.');
//   }
//   return client;
// };

// database/redis/redis.js
// import redis from './upstashClient.js';
// import logger from '../../utils/logger.js';

// export const connectRedis = async () => {
//   try {
//     // Upstash doesn’t need a real "connect" step, so we just log once.
//     logger.info('Redis (Upstash) client initialized successfully');
//   } catch (error) {
//     logger.error('Redis connection failed:', error);
//     throw error;
//   }
// };

// export const getRedisClient = () => {
//   return redis;
// };
