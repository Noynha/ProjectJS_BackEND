const orderDetailRouter = require('express').Router()
const orderDetailController = require('../controller/order_detail')

orderDetailRouter.get('/', async (req, res) => {
    try {
      const { id } = req.query
      if (id) {
        const order_detail = await orderDetailController.getOrderDetailById(id)
        if (!order_detail) {
          return res.status(404).json({
            message: 'order_detail not found',
            data: null
          })
        }
  
        return res.status(200).json({
          message: 'Success',
          data: order_detail
        })
      }
  
      const order_detail = await orderDetailController.getAllOrderDetail();
      return res.status(200).json({
        message: 'Success',
        data: order_detail
      })
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error')
    }
})

module.exports = orderDetailRouter
