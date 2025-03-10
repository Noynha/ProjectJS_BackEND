const ordersRouter = require('express').Router()
const ordersController = require('../controller/orders')


ordersRouter.get('/', async (req, res) => {
    try {
      const { id } = req.query
      if (id) {
        const orders = await ordersController.getOrdersById(id)
        if (!orders) {
          return res.status(404).json({
            message: 'Order not found',
            data: null
          })
        }
  
        return res.status(200).json({
          message: 'Success',
          data: orders
        })
      }
  
      const orders = await ordersController.getAllOrders();
      return res.status(200).json({
        message: 'Success',
        data: orders
      })
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error')
    }
})
  
ordersRouter.post("/", async (req, res) => {
    try {
        const { customer_id, status, drop_at, take_at } = req.body;
        if (!customer_id || !status || !drop_at || !take_at) {
            return res.status(400).json({
              message: "Customer ID or Status or Drop_at or Take_at are required",
              data: null
            })
        }

        const newOrders = await ordersController.createOrders(customer_id, status, drop_at, take_at);
        res.status(201).json({ message: "Order created successfully", data: newOrders });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }  
});
  
  
ordersRouter.put("/", async (req, res) => {
    try {
        const { id } = req.query;
        const { status, drop_at, take_at } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'ID is required to update the Order',
                data: null
            });
        }
        const order = await ordersController.getOrdersById(id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                data: null
            });
        }

        if (status === undefined || status === null) {
          return res.status(400).json({
              message: "Status is required",
              data: null
          });
        }

        drop_at = drop_at ?? order.drop_at;
        take_at = take_at ?? order.take_at;
  
        await ordersController.updateOrders(id, { status, total_price, drop_at, take_at });
        res.status(200).json({ message: "Orders updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

ordersRouter.delete('/', async (req, res) => {
    try {
        const { id } = req.query;  
        if (!id) {
            return res.status(400).json({
            message: 'ID is required to delete the orders',
            data: null
        });
        }
        const orders = await ordersController.getOrdersById(id);
      if (!orders) {
        return res.status(404).json({
          message: 'Order not found',
          data: null
        });
      }
        await ordersController.deleteOrders(id);
  
        return res.status(200).json({
            message: 'Order deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json(error?.message || 'Internal server error');
    }
});
  

module.exports = ordersRouter
