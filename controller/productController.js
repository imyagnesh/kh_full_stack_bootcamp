const ResponseWrapper = require("../helper/responseWrapper");
const ProductModel = require("../model/productModel")

class ProductController {
    static async addProduct(req, res) {
        const resWrapper = new ResponseWrapper(res);
        try {
            const product = await ProductModel.create(req.body); 

            resWrapper.create(product);
        } catch (error) {
            resWrapper.serverError(error.message)
        }
    }

    static async  getAllProducts(req, res) {
        const resWrapper = new ResponseWrapper(res);
        try {
            const products = await ProductModel.find();
            resWrapper.ok(products)
        } catch (error) {
            resWrapper.serverError(error.message)
        }
    }

    static async getProduct(req, res) {
        const resWrapper = new ResponseWrapper(res);
        try {
            const product = await ProductModel.findById(req.params.id)
            resWrapper.ok(product)
        } catch (error) {
            resWrapper.serverError(error.message)
        }
    }
}

module.exports =  ProductController