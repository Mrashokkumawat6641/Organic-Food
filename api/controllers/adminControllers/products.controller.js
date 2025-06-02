import { UserService } from '../../services/adminServices/product.Service.js';
import { successResponse, errorResponse } from '../../../utils/response.js';

const userService = new UserService();

export const getUsers = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const data = await userService.fetchUsers(page, limit);

        return successResponse(res, {
            message: 'Users fetched successfully',
            ...data
        });
    } catch (error) {
        return errorResponse(res, 'Error fetching users');
    }
};
