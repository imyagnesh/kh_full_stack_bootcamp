const joi = require("joi")

const loginValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3).max(20)
})

const registerValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3).max(20)
})

module.exports = {
    loginValidator,
    registerValidator
}