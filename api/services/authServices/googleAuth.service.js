import { OAuth2Client } from 'google-auth-library';
import createError from 'http-errors';
import config from '../../../database/config/google.config.js';

const googleClient = new OAuth2Client(config.clientId, config.clientSecret);

export const getGoogleProfile = async (idToken) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: [config.clientId],
        });

        const data = ticket.getPayload();

        if (!data) {
            throw createError(422, { errors: { user: 'wrongToken' } });
        }

        return {
            id: data.sub,
            email: data.email,
            firstName: data.given_name,
            lastName: data.family_name,
        };
    } catch (err) {
        throw createError(422, { message: 'Invalid Google token', details: err });
    }
};
