const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
    name: String,
    category: {
        type: String,
        enum: ["mobile", "laptop", "tablet"]
    },
    price: Number,
    quantity: Number
}, {
    toJSON: {
        versionKey: false,
    }
});

module.exports = model("Product",ProductSchema)