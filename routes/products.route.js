const express = require('express')
const ProductController = require('../controller/productController')
const validate = require('../middleware/validate')
const verifyToken = require('../middleware/verifyToken')
const { productValidator } = require('../validators/productValidator')
const router = express.Router()

router.get("/", verifyToken, ProductController.getAllProducts)

router.get("/:id", verifyToken, ProductController.getProduct)

router.post("/",[validate(productValidator), verifyToken], ProductController.addProduct)

module.exports = router;