import express from 'express';
import { registerUser, signin, logout, getAlluser, sportsRegister, sportsLogin, sportAllUsers } from '../../controllers/authController/auth.controller.js';
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
router.get('/getAllUsers', getAlluser);


router.post('/sportsRegister', sportsRegister);
router.post('/sportsLogin', sportsLogin);
router.get('/sportAllUsers', authMiddleware, sportAllUsers);
router.get('/google',

    // #swagger.tags = ['GoogleAuth']
    // #swagger.summary = 'Authenticate with Google'
    // #swagger.description = 'Initiate Google OAuth authentication.'
    /* #swagger.responses[302] = { 
        description: 'Redirects to Google for authentication.' 
    } */
    passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    async (req, res) => {
        // #swagger.tags = ['GoogleAuth']
        // #swagger.summary = 'Google OAuth callback'
        // #swagger.description = 'Handles Google OAuth callback and returns JWT token.'
        /* #swagger.responses[200] = { 
            description: 'JWT token returned after successful authentication.',
            schema: { token: 'jwt_token_here' }
        } */
        const token = generateToken(req.user._id);
        res.json({ token });
    }
);

// #swagger.tags = ['Auth']

router.get('/facebook',
    // #swagger.tags = ['FacebookAuth']
    // #swagger.summary = 'Authenticate with Facebook'
    // #swagger.description = 'Initiate Facebook OAuth authentication.'
    /* #swagger.responses[302] = { 
        description: 'Redirects to Facebook for authentication.' 
    } */
    passport.authenticate('facebook', { scope: ['email'] })
);


router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    async (req, res) => {
        // #swagger.tags = ['FacebookAuth']
        // #swagger.summary = 'Facebook OAuth callback'
        // #swagger.description = 'Handles Facebook OAuth callback and returns JWT token.'
        /* #swagger.responses[200] = { 
            description: 'JWT token returned after successful authentication.',
            schema: { token: 'jwt_token_here' }
        } */
        const token = generateToken(req.user._id);
        res.json({ token });
    }
);
export default router;
