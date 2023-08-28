const express = require('express')
const productRouter = express.Router()

const { createProduct, getProducts, updateProduct, deleteProduct, getDetailProduct } = require('../controller/productController')

productRouter.get('/', getProducts)
productRouter.get('/:id', getDetailProduct)
productRouter.post('/', createProduct)
productRouter.patch('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter;
