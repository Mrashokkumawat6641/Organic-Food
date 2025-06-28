import { getGoogleProfile } from '../../services/authServices/googleAuth.service.js';
import { validateGoogleLogin } from '../../services/authServices/gAuth.service.js';

export const googleLoginController = async (req, res, next) => {
    // #swagger.tags = ['Google Auth']
    // #swagger.summary = 'Google login'
    // #swagger.description = 'This endpoint allows users to log in using their Google account.'
    /* #swagger.requestBody = {
        required: true,
        description: 'Google ID token',
        required: true,
        schema: {
            type: 'object',
            properties: {
                idToken: {
                    type: 'string',
                    description: 'Google ID token obtained from the client-side',
                    example: 'ya29.a0ARrdaM9...',
                }
            },
            required: ['idToken']
            }
        } */
    try {
        const { idToken } = req.body;
        const profile = await getGoogleProfile(idToken);
        const result = await validateGoogleLogin('google', profile);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
