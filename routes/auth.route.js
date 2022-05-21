const express = require('express')
const Auth = require('../controller/authController')
const router = express.Router()
const validate = require("../middleware/validate")
const {loginValidator, registerValidator} = require("../validators/authValidator")

router.post("/login", validate(loginValidator) , Auth.login)

router.post("/register", validate(registerValidator), Auth.register)

module.exports = router;