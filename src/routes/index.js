const router = require('express').Router()
const customerRouter = require('./customer')

// Routes
router.get('/', (req, res) => res.send('API V1'))
router.use('/customer', customerRouter)

module.exports = router