import express from 'express';
import { googleLoginController } from '../../controllers/authController/googleAuth.controller.js';

const router = express.Router();



router.post('/auth/google/login', googleLoginController);

export default router;
