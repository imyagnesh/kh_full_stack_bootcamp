const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = Schema({
    name: String,
    email: String,
    password: String
}, {
    toJSON: {
        transform: (doc, ret) => {
            const { password, ...rest } = ret;
            return rest;
        },
        versionKey: false,
    }
});

UserSchema.pre("save", async function (next) {
    try {
        if (this.isModified('password')) {
            const hash = await this.encryptPassword(this.password);
            this.password = hash;
        }
    } catch (error) {
        console.log(error);
    } finally {
        next()
    }
})

UserSchema.methods = {
    async encryptPassword(password) {
        return await bcrypt.hash(password, bcrypt.genSaltSync(10))
    },

    async comparePassword(plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    },

    generateToken() {
        return jwt.sign(
            {
                name: this.name,
                email: this.email,
                id: this._id,
            },
            "secret_token_key",
            {
                expiresIn: 24 * 60 * 60,
            }
        )
    }
}

module.exports = model("User", UserSchema);

