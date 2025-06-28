import { generateToken } from "../../../middlewares/auth.middleware.js";

export const validateGoogleLogin = async (provider, socialData) => {
  const token = generateToken({
    _id: socialData.id,
    emailaddress: socialData.email,
    fullname: `${socialData.firstName} ${socialData.lastName}`,
    role: 'user' 
  });

  return {
    message: 'Google login successful',
    provider,
    user: socialData,
    token,
  };
};
