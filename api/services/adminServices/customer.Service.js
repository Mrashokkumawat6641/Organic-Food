import Products from '../../models/adminModels/customer.Model.js';
import { getRedisClient } from '../../../database/redis/redis.js';
import { getNextSequence } from '../../Function/CounterFunction.js';
import CustomError from '../../../utils/response.js';


export const addNewUser = async ({
    id,
    Learners,
    email,
    avatar,
    country,
    Language,
    Occupation,
    Objective,
    Subscription
}) => {
    if (!Learners || !email || !avatar || !country || !Language || !Occupation || !Objective || !Subscription) {
        throw new Error('Please fill in all fields');
    }
    const existingUser = await Products.findOne({ email });
    if (existingUser) {
        const error = new Error('User already exists');
        error.status = 409;
        throw error;
    }
    const customId = await getNextSequence('userId');
    const newUser = new Products({
        id: customId,
        Learners,
        email,
        avatar,
        country,
        Language,
        Occupation,
        Objective,
        Subscription
    });
    await newUser.save();

    return {
        message: 'User registered successfully',
        user: newUser,
        id: newUser.id,

    };
};

export const getUsers = async ({ page = 1, limit = 10 } = {}) => {
    try {
        const skip = (page - 1) * limit;
        const users = await Products.find().skip(skip).limit(limit);
        const total = await Products.countDocuments();
        return {
            users,
            total,
            page,
            pages: Math.ceil(total / limit),
            loaded: users.length // kitna data load hua hai
        };
    } catch (error) {
        throw new CustomError('Failed to fetch users: ' + error.message);
    }
};
