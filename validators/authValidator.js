const joi = require("joi")

const loginValidator = joi.object({
    username: joi.string().required(),
    password: joi.string().required().min(3).max(20)
})

const registerValidator = joi.object({
    name: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required().min(3).max(20)
})

module.exports = {
    loginValidator,
    registerValidator
}