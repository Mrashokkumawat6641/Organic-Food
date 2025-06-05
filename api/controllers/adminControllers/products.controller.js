import { addNewUser } from '../../services/adminServices/product.Service.js';
import { successResponse, errorResponse } from '../../../utils/response.js';



export const addNewUsers = async (req, res) => {
  try {
    const result = await addNewUser(req.body);
    return successResponse(res, result, 201);
  } catch (error) {
    console.error('Error adding new user:', error);
    return errorResponse(res, error.message, 500);
  }
}