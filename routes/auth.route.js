const express = require('express')
const ResponseWrapper = require('../helper/responseWrapper')
const router = express.Router()
const validate = require("../middleware/validate")
const {loginValidator, registerValidator} = require("../validators/authValidator")

router.post("/login", validate(loginValidator) , (req, res) => {
    const responseWrapper = new ResponseWrapper(res);
    responseWrapper.ok("login Success...")
})

router.post("/register", validate(registerValidator), (req, res) => {
    res.status(201).send("register Success...") 
})

module.exports = router;