import Joi from 'joi';

export const googleLoginSchema = Joi.object({
    idToken: Joi.string().required(),
});
