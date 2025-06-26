import express from 'express';
import authRoutes from '../authRoutes/auth.routes.js';
import imageRoutes from '../adminRoutes/image.routes.js';
import adminRoutes from '../adminRoutes/product.Routes.js';
import customerRoute from '../adminRoutes/customer.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/image', imageRoutes);
router.use('/products', adminRoutes);
router.use('/customers', customerRoute);

export { router };
