// api/validator/userValidator.js
import Joi from 'joi';

export const newUser = Joi.object({
    id: Joi.string().required(),
    Learners: Joi.string().required(),
    email: Joi.string().email().required(),
    avatar: Joi.string().uri().optional(),
    country: Joi.string().required(),
    Language: Joi.string().required(),
    Occupation: Joi.string().required(),
    Objective: Joi.string().required(),
    Subscription: Joi.boolean().required()
}).messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'All fields are required',
    'string.uri': 'Avatar must be a valid URL',
    'any.only': 'Invalid value for country or language'
});
