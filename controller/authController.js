const ResponseWrapper = require("../helper/responseWrapper");
const UserModel = require("../model/userModel");
class Auth {
    static async login(req, res) {
        const responseWrapper = new ResponseWrapper(res);
        const {email, password} = req.body;
        
        const user = await UserModel.findOne({ email });
        if(!user) {
            return responseWrapper.unauthorized("email is not available")
        }
        const isValidPassword = await user.comparePassword(password);
        if(!isValidPassword) {
            return responseWrapper.unauthorized("password is not valid")
        }

        const token = user.generateToken();

        responseWrapper.ok({...user.toJSON(), access_token: token})
    }

    static async register(req, res) {
        const responseWrapper = new ResponseWrapper(res);
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ email });
            if(user) {
                return responseWrapper.badRequest("email already exist")
            }

            const userData = await UserModel.create(req.body);

            const token = userData.generateToken();

            return responseWrapper.create({...userData, access_token: token})
        } catch (error) {

        }
    }
}

module.exports = Auth;