import express from 'express';
import { addNewUsers } from '../../controllers/adminControllers/products.controller.js';
import { validateBody } from '../../../middlewares/validate.middleware.js';
import { newUser } from '../../validators/adminValidator/product.Validator.js';
const router = express.Router();

router.post('/addNewUsers', addNewUsers);

export default router;