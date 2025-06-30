import Product from '../../models/adminModels/Product.Model.js';

export const createProduct = async (data) => {
    return await Product.create(data);
};
export const getProducts = async (query = {}, redisClient) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const cacheKey = `products:page:${page}:limit:${limit}`;
    console.log("Cache Key:", cacheKey);

    if (redisClient) {
        const cachedProducts = await redisClient.get(cacheKey);
        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }
    }

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    const result = {
        products,
        total,
        page,
        pages: Math.ceil(total / limit),
        loaded: products.length
    };

    if (redisClient) {
        await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600); // Cache for 1 hour
    }

    return result;
};
