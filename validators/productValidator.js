const joi = require("joi")

const productValidator = joi.object({
    name: joi.string().required(),
    category:joi.string().required(),
    price: joi.number().min(0).required(),
    quantity: joi.number().min(0).required(),
    image: joi.string().uri()
});

module.exports = {
    productValidator
}