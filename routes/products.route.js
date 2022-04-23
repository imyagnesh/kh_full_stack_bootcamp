const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).send("Products data...")
})

router.get("/:id", (req,res) => {
    res.status(200).send(`${req.params.id}`)
})

module.exports = router;