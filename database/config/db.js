import mongoose from 'mongoose';
import logger from '../../utils/logger.js';
import { MONGO_URI } from '../../env.js';

const reconnectTimeout = 5000;

export const connectToDatabase = async () => {
  try {
    // Connect using MONGO_URI from .env
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    // Events
    db.on('connecting', () => {
      logger.info('MongoDB:         Connecting...');
    });

    db.on('error', (error) => {
      logger.error(`MongoDB:         Connection error: ${error}`);
      mongoose.disconnect();
    });

    db.once('open', () => {
      logger.info('MongoDB:         Connection open');
      logger.info(`MongoDB:         Database: ${mongoose.connection.db.databaseName}`);
    });

    db.on('disconnected', () => {
      logger.warn(`MongoDB:         Disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
      setTimeout(connectToDatabase, reconnectTimeout);
    });

    db.on('reconnected', () => {
      logger.info('MongoDB:         Reconnected!');
    });

    // Log success
    logger.info(`MongoDB:         Connected successfully ${conn.connection.host}`);
        await mongoose.connection.collection('test').insertOne({ test: true });
  } catch (err) {
    logger.error(`MongoDB:         Initial connection failed: ${err.message}`);
    process.exit(1);
  }
};
