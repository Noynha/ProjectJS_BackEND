const orderDetailRouter = require('express').Router()
const orderDetailController = require('../controller/order_detail')

orderDetailRouter.get('/', async (req, res) => {
    try {
      const { id } = req.query
      if (id) {
        const orders_detail = await orderDetailController.getOrderDetailById(id)
        if (!orders_detail) {
          return res.status(404).json({
            message: 'order_detail not found',
            data: null
          })
        }
  
        return res.status(200).json({
          message: 'Success',
          data: orders_detail
        })
      }
  
      const orders_detail = await orderDetailController.getAllOrderDetail();
      return res.status(200).json({
        message: 'Success',
        data: orders_detail
      })
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error')
    }
})

orderDetailRouter.post("/", async (req, res) => {
    try {
        const { orders_id,product_id,program_id,item } = req.body;

        if (!orders_id || !product_id|| !program_id|| !item ) {
            return res.status(400).json({ message: "Order ID and Product ID and Program ID are required", data: null });
        }

        const newOrder_detail = await orderDetailController.createOrdersDetail(orders_id,product_id,program_id,item);
        res.status(201).json({ message: "Order_detail created successfully", data: newOrder_detail });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }  
});

orderDetailRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { item } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'ID is required to update the OrderDetail',
                data: null
            });
        }
        console.log(id)
        const orderDetail = await orderDetailController.getOrderDetailById(id);
        
        console.log(orderDetail)
        if (!orderDetail) {
            return res.status(404).json({
                message: 'OrderDetail not found',
                data: null
            });
        }

        if ( !item) {
            return res.status(400).json({
                message: "item is required",
                data: null
            });
        }
  
        await orderDetailController.updateOrderDetail(id, { item });
        res.status(200).json({ message: "item orderDeta updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

orderDetailRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        if (!id) {
            return res.status(400).json({
            message: 'ID is required to delete the orderDetail',
            data: null
        });
        }
        const orderDetail = await orderDetailController.getOrderDetailById(id);
      if (!orderDetail) {
        return res.status(404).json({
          message: 'Order not found',
          data: null
        });
      }
        await orderDetailController.deleteOrderDetail(id);
  
        return res.status(200).json({
            message: 'OrderDetail deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json(error?.message || 'Internal server error');
    }
});

module.exports = orderDetailRouter
