import express from 'express';
import { registerUser, signin, logout } from '../../controllers/authController/auth.controller.js';
import { validateBody } from '../../../middlewares/validate.middleware.js';
import { isAdmin } from '../../../middlewares/admin.middleware.js';
import { registerSchema } from '../../validators/authValidators/auth.validator.js'
import { loginSchema } from '../../validators/authValidators/auth.validator.js';
import { generateToken, authMiddleware } from '../../../middlewares/auth.middleware.js';
import passport from '../../../database/config/passport.js';
const router = express.Router();

router.post('/Signup', validateBody(registerSchema), registerUser);
router.post('/signin', validateBody(loginSchema), signin)
router.post('/logout', authMiddleware, logout);
router.get('/getAllUsers', getAllusers );
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
    const token = generateToken(req.user._id);
    res.json({ token });
});
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), async (req, res) => {
    const token = generateToken(req.user._id);
    res.json({ token });
});
export default router;
