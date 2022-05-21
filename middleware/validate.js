const ResponseWrapper = require("../helper/responseWrapper");

const validate = schema => (req, res, next) => {
    const responseWrapper = new ResponseWrapper(res);
    const {error} = schema.validate(req.body);
    if(error) {
        return responseWrapper.badRequest(error.details[0].message);
    }
    next()
}

module.exports = validate