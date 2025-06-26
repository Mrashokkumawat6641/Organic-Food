import express from 'express';
import { addProduct } from '../../controllers/adminControllers/customer.Controller.js';

const router = express.Router();

router.post('/add', addProduct);

export default router;