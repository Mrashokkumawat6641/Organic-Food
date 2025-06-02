import { register, loginuser, logoutUser } from '../../services/authServices/auth.service.js';
import logger from '../../../utils/logger.js';
import { successResponse, errorResponse } from '../../../utils/response.js';
import { token } from 'morgan';
import { getStatusCode } from 'routing-controllers-openapi';

export const registerUser = async (req, res, next) => {
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

