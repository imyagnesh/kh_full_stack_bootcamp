const express = require('express')
const router = express.Router()
const validate = require("../middleware/validate")
const {loginValidator, registerValidator} = require("../validators/authValidator")

router.post("/login", validate(loginValidator) , (req, res) => {
    console.log(req.body);
    res.status(200).send("login Success...") 
})

router.post("/register", validate(registerValidator), (req, res) => {
    res.status(201).send("register Success...") 
})

module.exports = router;