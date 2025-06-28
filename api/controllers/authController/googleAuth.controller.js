import { getGoogleProfile } from '../../services/authServices/googleAuth.service.js';
import { validateGoogleLogin } from '../../services/authServices/gAuth.service.js';

export const googleLoginController = async (req, res, next) => {
/*
  #swagger.tags = ['Google Auth']
  #swagger.summary = 'Google login'
  #swagger.description = 'Google login using idToken from client'
  #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["idToken"],
            properties: {
              idToken: {
                type: "string",
                description: "Google ID token",
                example: "ya29.a0ARrdaM..."
              }
            }
          }
        }
      }
  }
*/

    try {
        const { idToken } = req.body;
        const profile = await getGoogleProfile(idToken);
        const result = await validateGoogleLogin('google', profile);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
