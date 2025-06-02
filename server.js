import app from './app.js';
import { connectToDatabase } from './database/config/db.js';
import { connectRedis } from './database/redis/redis.js';
import logger from './utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToDatabase();
        logger.info('MongoDB connected');

        await connectRedis();
        logger.info('Redis connected');

        app.listen(PORT, () => {
            logger.info(`Server running at: http://localhost:${PORT}`);
            logger.info(`MongoDB:         ${process.env.MONGO_URI}`);
            logger.info(`Redis:           ${process.env.REDIS_PORT}`);

            logger.info(`Swagger docs:     http://localhost:${PORT}/api-docs`);
        });
    } catch (err) {
        logger.error('Startup error: ' + err.message);
        process.exit(1);
    }
};

startServer();
