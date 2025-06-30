import express from 'express';
import { addNewUsers, getAllUsers } from '../../controllers/adminControllers/customer.controllerjs.js';
import { validateBody } from '../../../middlewares/validate.middleware.js';
import { newUser } from '../../validators/adminValidator/product.Validator.js';
const router = express.Router();

router.post('/addNewUsers', addNewUsers);   
router.get('/getAllUsers', getAllUsers);   

export default router;