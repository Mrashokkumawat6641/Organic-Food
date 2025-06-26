import Product from '../../models/adminModels/customer.Model.js';

export const createProduct = async (data) => {
    return await Product.create(data);
};