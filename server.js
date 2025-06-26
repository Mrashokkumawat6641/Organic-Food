import app from './app.js';
import { connectToDatabase } from './database/config/db.js';
import { connectRedis } from './database/redis/redis.js';
import { MONGO_URI, PORT, REDIS_PORT, Swagger_UI } from './env.js';
import logger from './utils/logger.js';

const startServer = async () => {
    try {
        await connectToDatabase();
        logger.info('MongoDB connected');

        await connectRedis();
        logger.info('Redis connected');

        app.listen(PORT, () => {
            logger.info(`Server running at: http://localhost:${PORT}`);
            logger.info(`MongoDB:         ${MONGO_URI}`);
            logger.info(`Redis:           ${REDIS_PORT}`);
            logger.info(`SwaggerUI:         http://localhost:${PORT}${Swagger_UI}`);
        });
    } catch (err) {
        logger.error('Startup error: ' + err.message);
        process.exit(1);
    }
};

startServer();
