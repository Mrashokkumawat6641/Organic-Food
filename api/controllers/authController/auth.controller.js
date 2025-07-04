import { register, loginuser, logoutUser, getAllUsers, sportsRegisterService, getAllSportsUsers, sportsLoginService } from '../../services/authServices/auth.service.js';
import logger from '../../../utils/logger.js';
import { successResponse, errorResponse } from '../../../utils/response.js';
import { token } from 'morgan';
import { getStatusCode } from 'routing-controllers-openapi';

export const registerUser = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User registration'
  // #swagger.description = 'This endpoint allows users to register by providing their details.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'User registration details',
        required: true,
        schema: {
          $fullname: 'John Doe',
          $emailaddress: 'john.doe@example.com',
          $password: 'password123',
          $confirmpassword: 'password123',
        }
      } */
  try {
    const result = await register(req.body);
    return successResponse(res, {
      message: result.message,
      userId: result.userId,
      token: result.token,
    }, 201);
  } catch (error) {
    logger.error('Register error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const signin = async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User login'
  // #swagger.description = 'This endpoint allows users to log in by providing their email and password.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'User login details',
        required: true,
        schema: {
          $emailaddress: 'john.doe@example.com', 
          $password: 'password123', 
        }
      } */
  try {
    const result = await loginuser(req.body);
    console.log('Login result:', req.body);
    return successResponse(res, {
      message: 'Login successful',
      token: result.token,
      user: result.user,
    }, 200);
  } catch (error) {
    logger.error('Login error:', error);
    return errorResponse(res, error.message, 401);

  }
};


export const logout = async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'User logout'
  // #swagger.description = 'This endpoint allows users to log out by invalidating their token.'
  /*  #swagger.parameters['token'] = {
        in: 'header',
        description: 'User authentication token',
        required: true,
        type: 'string',
        schema: {
          $type: 'Bearer <token>'
        }
      } */
  try {
    const token = req.token;
    const decoded = req.user;
    console.log('Logout token:', token);
    console.log('Logout decoded user:', decoded);
    if (!token || !decoded || !decoded.exp) {
      return res.status(400).json({ message: 'Missing token or user data' });
    }
    await logoutUser(token, decoded.exp);
    console.log('logoutuser', logoutUser)
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Failed to logout' });
  }
};

export const getAlluser = async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'This endpoint retrieves all registered users.'
  /*  #swagger.responses[200] = {
        description: 'List of all users',
    }
        */
  try {
    const users = await getAllUsers();
    return successResponse(res, { users }, 200);
  } catch (error) {
    logger.error('Get all users error:', error);
    return errorResponse(res, error.message, 500);
  }
}
export const sportsRegister = async (req, res) => {
  // #swagger.tags = ['SportsAuth']
  // #swagger.summary = 'Sports user registration'
  // #swagger.description = 'This endpoint allows sports users to register by providing their details.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Sports user registration details',
        required: true,
        schema: {
          $name: 'Virat Kohli',
          $email: 'john.doe@example.com',
          $mobile: '9876543210',
          $password: 'password123',
          $confirmPassword: 'password123'
        }
      } */
  try {
    const result = await sportsRegisterService(req.body);
    return successResponse(res, {
      message: result.message,
      userId: result.userId,
      token: result.token,
    }, 201);
  } catch (error) {
    logger.error('Sports Register error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const sportsLogin = async (req, res) => {
  // #swagger.tags = ['SportsAuth']
  // #swagger.summary = 'Sports user login'
  // #swagger.description = 'This endpoint allows sports users to log in using mobile and password.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Sports user login details',
        required: true,
        schema: {
          $mobile: '9876543210',
          $password: 'password123'
        }
      } */
  try {
    const result = await sportsLoginService(req.body);
    return successResponse(res, {
      message: 'Login successful',
      token: result.token,
      user: result.user,
    }, 200);
  } catch (error) {
    logger.error('Sports Login error:', error);
    return errorResponse(res, error.message, 401);
  }
};

export const sportAllUsers = async (req, res) => {
  // #swagger.tags = ['SportsAuth']
  // #swagger.summary = 'Get all sports users'
  // #swagger.description = 'This endpoint retrieves all registered sports users.'
  /*  #swagger.responses[200] = {
        description: 'List of all sports users',
    }
  */
  try {
    const users = await getAllSportsUsers();
    return successResponse(res, { users }, 200);
  } catch (error) {
    logger.error('Get all sports users error:', error);
    return errorResponse(res, error.message, 500);
  }
};