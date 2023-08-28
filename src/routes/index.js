const express = require('express')
const routes = express.Router()

const productRouter = require('./productRouter.js')

routes.use('/products', productRouter)

module.exports = routes