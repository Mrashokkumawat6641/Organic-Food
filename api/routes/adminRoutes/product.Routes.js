import express from 'express';
import { getUsers } from '../../controllers/adminControllers/products.controller.js';
import { validateBody } from '../../../middlewares/validate.middleware.js';
import { userListQuerySchema } from '../../validators/adminValidator/product.Validator.js';
const router = express.Router();

router.get('/getAllUsers', getUsers);

export default router;