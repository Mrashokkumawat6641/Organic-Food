import { addNewUser } from '../../services/adminServices/product.Service.js';
import { successResponse, errorResponse } from '../../../utils/response.js';



export const addNewUsers = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Add a new user'
  // #swagger.description = 'This endpoint allows you to add a new user to the system.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'User details',
        required: true,
        schema: {
          $id: 1,
          $Learners: 'John Doe',
          $email: 'john.doe@example.com',
          $avatar: 'https://res.cloudinary.com/dpxvet5ra/image/upload/v1748110022/xmzqvlmrdtm7tzqwlr1m.jpg',
          $country: 'USA',
          $Language: 'English',
          $Occupation: 'Engineer',
          $Objective: 'Learn about organic food',
          $Subscription: true
        }
      } */
  try {
    const result = await addNewUser(req.body);
    return successResponse(res, result, 201);
  } catch (error) {
    console.error('Error adding new user:', error);
    return errorResponse(res, error.message, 500);
  }
}