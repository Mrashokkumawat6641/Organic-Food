import { createProduct, getProducts } from '../../services/adminServices/Product.service.js';
import { successResponse, errorResponse } from '../../../utils/response.js';


export const addProduct = async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.summary = 'Add a new product'
    // #swagger.description = 'This endpoint adds a new product to the database.'
    /*  #swagger.parameters['body'] = {
          in: 'body',
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
export const getAllProducts = async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.summary = 'Get all products'
    // #swagger.description = 'This endpoint retrieves all products from the database.'
    /*  #swagger.responses[200] = {
          description: 'Products retrieved successfully',
}
} */
    try {
        const users = await getProducts();
        return successResponse(res, users, 200, 'Users retrieved successfully');
    } catch (error) {
        return errorResponse(res, error, 500, 'Failed to retrieve users');

    }
}