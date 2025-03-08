const router = require('express').Router()
const customerRouter = require('./customer')
const programRouter = require('./program')
const productRouter = require('./product')
const ordersRouter = require('./orders')


// Routes
router.get('/', (req, res) => res.send('API V1'))
router.use('/customer', customerRouter)
router.use('/program', programRouter)
router.use('/product', productRouter)
router.use('/orders', ordersRouter)

module.exports = router