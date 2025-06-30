import express from 'express';
import authRoutes from '../authRoutes/auth.routes.js';
import imageRoutes from '../adminRoutes/image.routes.js';
import customerRoute from '../adminRoutes/customer.Routes.js';
import ProductRoute from '../adminRoutes/Product.routes.js';
import googleAuthRoutes from '../authRoutes/googleAuth.routes.js';



const router = express.Router();

router.use('/auth', authRoutes);
router.use('/image', imageRoutes);
router.use('/products', ProductRoute);
router.use('/customers', customerRoute);
router.use('/v1', googleAuthRoutes);

export { router };
