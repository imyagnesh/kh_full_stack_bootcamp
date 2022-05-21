const ResponseWrapper = require("../helper/responseWrapper");
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const responseWrapper = new ResponseWrapper(res);
    const { authorization } = req.headers;
    if(!authorization) {
        return responseWrapper.forbidden("token is not available");
    }

    const token = authorization.replace(/bearer /i, '');

    jwt.verify(token, "secret_token_key", (err, decoded) => {
        if(err) {
            responseWrapper.forbidden("token not valid")
            return;
        }
        const body = { ...req.body, userId: decoded.id, name:decoded.name, email: decoded.email  };
        req.body = body;
        next()
    })
    
}

module.exports = verifyToken