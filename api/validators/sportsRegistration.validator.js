import Joi from 'joi';

export const sportsRegistrationSchema = Joi.object({
    playerId: Joi.string().required(),
    coachname: Joi.string().allow('', null),
    middleName: Joi.string().allow('', null),
    photo: Joi.string().uri().allow('', null),
    age: Joi.string().allow('', null),
    gender: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    state: Joi.string().allow('', null),
    mobile: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'Please enter a valid 10-digit mobile number'
        }),
    altMobile: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'Please enter a valid 10-digit mobile number'
        }),
    selectedGameType: Joi.string().valid('indoor', 'outdoor'),
    selectedGame: Joi.string().valid(
        "Badminton",
        "Table Tennis",
        "Chess",
        "Carrom",
        "Wrestling",
        "Cricket",
        "Football",
        "Basketball",
        "Kabaddi",
        "Volleyball",
        "Athletics"
    ).required(),
    playerName: Joi.string().required(),
    playerAge: Joi.string().required(),
    playerCity: Joi.string().required(),
    playerState: Joi.string().required(),
    playerPhoto: Joi.string().required(),
    playerAdharPhoto: Joi.string().required(),
});