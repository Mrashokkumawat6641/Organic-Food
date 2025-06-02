import User from '../models/adminModels/product.Model.js'; // Your mongoose model
import { getRedisClient } from '../../database/redis/redis.js';

export class UserRepository {
  constructor() {
    this.redisClient = getRedisClient();
  }

  async getUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const cacheKey = `users:${page}:${limit}`;

    // Check Redis cache first
    const cached = await this.redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fetch from DB
    const totalUsers = await User.countDocuments();
    const users = await User.find({})
      .skip(skip)
      .limit(limit)
      .select('-__v -_id')
      .lean();

    const totalPages = Math.ceil(totalUsers / limit);

    const result = {
      totalUsers,
      currentPage: page,
      totalPages,
      users
    };

    await this.redisClient.setEx(cacheKey, 600, JSON.stringify(result));

    return result;
  }
}
