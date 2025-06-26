import { createProduct } from '../../services/adminServices/customer.service.js';
import { successResponse, errorResponse } from '../../../utils/response.js';


export const addProduct = async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.summary = 'Add a new product'
    // #swagger.description = 'This endpoint adds a new product to the database.'
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product details',
        required: true,
        schema: {
            $title: 'Organic Apple',
            $productImage: 'https://res.cloudinary.com/dpxvet5ra/image/upload/v1748110022/xmzqvlmrdtm7tzqwlr1m.jpg',
            $description: 'Fresh organic apples from local farms',
            $price: 120,
            $discount: 10,
            $category: 'Fruits',
            $rating: 4.5,
            $warrantyPeriod: '6 months',
            $returnPolicy: '30 days return',
            $stock: 50
        }
      } */
    try {
        const product = await createProduct(req.body);
        return successResponse(res, 'Product added successfully', 201, product);
    } catch (err) {
        return errorResponse(res, err, 500, 'Failed to add product');
    }
};