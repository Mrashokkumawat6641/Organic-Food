import express from 'express';
import { addProduct, getAllProducts } from '../../controllers/adminControllers/products.Controller.js';

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/getAllProducts', getAllProducts);

export default router;