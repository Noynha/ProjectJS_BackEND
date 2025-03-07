const customerRouter = require('express').Router()
const customerController = require('../controller/customer')

// Routes
customerRouter.get('/', async (req, res) => {
  try {
    const { id } = req.query
    if (id) {
      const customer = await customerController.getOnceCustomerById(id)
      if (!customer) {
        return res.status(404).json({
          message: 'Customer not found',
          data: null
        })
      }

      return res.status(200).json({
        message: 'success',
        data: customer
      })
    }

    const customers = await customerController.getManyCustomer()
    return res.status(200).json({
      message: 'Success',
      data: customers
    })
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error')
  }
})

customerRouter.post('/', async (req, res) => {
  try {
    const { name, phone } = req.body
    if (!name || !phone) {
      return res.status(400).json({
        message: 'Name and phone are required',
        data: null
      })
    }

    const findCustomer = await customerController.getOnceCustomerByName(name)
    if (findCustomer) {
      return res.status(400).json({
        message: 'Customer already exist',
        data: null
      })
    } 
    
    await customerController.createCustomer(name, phone)
    res.status(200).json({
      message: 'Customer created',
      data: null
    })
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error')
  }
})

module.exports = customerRouter