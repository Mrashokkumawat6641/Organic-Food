import Joi from 'joi';

export const registerSchema = Joi.object({
    fullname: Joi.string().required(),
    emailaddress: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmpassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match'
  })
});

export const loginSchema = Joi.object({
    emailaddress: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
