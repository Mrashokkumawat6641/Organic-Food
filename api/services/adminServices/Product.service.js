import Product from '../../models/adminModels/Product.Model.js';

export const createProduct = async (data) => {
    return await Product.create(data);
};
export const getProducts = async (query = {}, redisClient) => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const cacheKey = `products:page:${page}:limit:${limit}`;

    if (redisClient) {
        const cachedProducts = await redisClient.get(cacheKey);
        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }
    }

    const products = await Product.find().skip(skip).limit(limit);

    if (redisClient) {
        await redisClient.set(cacheKey, JSON.stringify(products), 'EX', 3600); // Cache for 1 hour
    }

    return products;
};