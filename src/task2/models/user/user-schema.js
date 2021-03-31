import Joi from 'joi';

const userSchema = Joi.object({
    login: Joi.string()
        .min(1)
        .required(),
    password: Joi.string()
        .alphanum()
        .required(),
    age: Joi.number()
        .min(4)
        .max(130)
});

export default userSchema;
