import Products from '../../models/adminModels/product.Model.js';
import { getRedisClient } from '../../../database/redis/redis.js';

export class UserService {
    constructor(redisClient) {      
        this.redisClient = redisClient;
    }

    async fetchUsers(page = 1, limit = 10) {
        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;
        const cacheKey = `users:${page}:${limit}`;

        const cached = await this.redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }

        const totalUsers = await Products.countDocuments();
        const users = await Products.find({})
            .skip(skip)
            .limit(limit)
            .select('-__v -_id')
            .lean();

        const totalPages = Math.ceil(totalUsers / limit);

        const result = {
            totalUsers,
            currentPage: page,
            totalPages,
            pageSize: limit,     
            users
        };

        await this.redisClient.setEx(cacheKey, 600, JSON.stringify(result));

        return result;
    }
}
