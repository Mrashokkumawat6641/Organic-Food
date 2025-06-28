import CustomError from "../../../utils/response.js";

export const validateGoogleLogin = async (provider, socialData) => {
    if (!provider || !socialData) {
        throw new CustomError('Provider and social data are required', 400);
    }
    return {
        message: 'Google login successful',
        provider,
        user: socialData,
        token: 'jwt_token_here',
    };
};
