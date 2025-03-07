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
        const { customer_id, total_price, status, drop_at, take_at } = req.body;
        if (!customer_id || !total_price || !status || !drop_at || !take_at) {
            return res.status(400).json({
              message: "Customer ID or Total price or Status or Drop_at or Take_at are required",
              data: null
            })
        }

        const newOrders = await ordersController.createOrders(customer_id, total_price, status, drop_at, take_at);
        res.status(201).json({ message: "Order created successfully", data: newOrders });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }  
});
  
  
ordersRouter.put("/", async (req, res) => {
    try {
        const { id } = req.query;
        const { status, total_price, drop_at, take_at } = req.body;

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

        if (total_price === undefined || total_price === null) {
            return res.status(400).json({
              message: "Total Price is required",
              data: null
          });
        }

        if (drop_at === undefined || drop_at === null) {
            return res.status(400).json({
              message: "Drop_at Price is required",
              data: null
          });
        }

        if (take_at === undefined || take_at === null) {
            return res.status(400).json({
              message: "Take_at Price is required",
              data: null
          });
        }
  
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
