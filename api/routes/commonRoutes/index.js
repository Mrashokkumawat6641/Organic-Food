import express from 'express';
import authRoutes from '../authRoutes/auth.routes.js';
import imageRoutes from '../adminRoutes/image.routes.js';
import customerRoute from '../adminRoutes/customer.Routes.js';
import ProductRoute from '../adminRoutes/Product.routes.js';
import googleAuthRoutes from '../authRoutes/googleAuth.routes.js';
import SportsRegistraion from '../../routes/sportsRegistrationRoutes/sportsRegistration.routes.js';
import paypalRegistration from '../../routes/sportsRegistrationRoutes/paypalRegistration.routes.js';



const router = express.Router();

router.use('/auth', authRoutes);
router.use('/image', imageRoutes);
router.use('/products', ProductRoute);
router.use('/customers', customerRoute);
router.use('/v1', googleAuthRoutes);
router.use('/sports_Event/SportsRegistraion', SportsRegistraion);
router.use('/sports_Event/paypalRegistration', paypalRegistration);


export { router };
