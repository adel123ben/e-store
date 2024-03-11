const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const bannerRoutes = require('./banner')
const productRouter = require('./product')
const sieCategoryRouter = require('./sizeCategory')
const colorsCategoryRouter = require('./colorsCategory')
const categoryRouter = require('./category')
const formulaireRouter = require('./formulair')

module.exports = (express) => {
    router.get('/', (req, res) => {
        res.send("Hello")
    })
    router.use('/auth', authRoutes(express))
    router.use('/banner', bannerRoutes(express))
    router.use('/product', productRouter(express))
    router.use('/size', sieCategoryRouter(express))
    router.use('/colors', colorsCategoryRouter(express))
    router.use('/category', categoryRouter(express))
    router.use('/formulaire', formulaireRouter(express))
    return router
}

