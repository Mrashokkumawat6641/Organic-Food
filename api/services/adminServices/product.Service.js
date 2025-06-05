import Products from '../../models/adminModels/product.Model.js';
import { getRedisClient } from '../../../database/redis/redis.js';
import { getNextSequence } from '../../Function/CounterFunction.js';


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
