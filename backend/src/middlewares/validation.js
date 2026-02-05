const joi = require('joi');

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(20).required(),
    nickname: joi.string().max(10).required()
});

module.exports = {signupSchema};
