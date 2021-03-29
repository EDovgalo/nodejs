import Joi from 'joi';

const userSchema = Joi.object({
    login: Joi.string()
        .min(1)
        .required(),
    password: Joi.string()
        .regex(/([0-9][a-z])|([a-z][0-9])/)
        .message('password must contains numbers and letters')
        .required(),
    age: Joi.number()
        .min(4)
        .max(130)
});

export default userSchema;
