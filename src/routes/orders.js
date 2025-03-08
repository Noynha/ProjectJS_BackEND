const ordersRouter = require('express').Router()
const ordersController = require('../controller/orders')

ordersRouter.get("/", async (req, res) => {
    try {
        const orders = await ordersController.getAllOrders();
        res.status(200).json({
            message: "Success",
            data: orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

ordersRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await ordersController.getOrderById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found", data: null });
        }
        res.status(200).json({ message: "Success", data: order });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }  
});
  
ordersRouter.post("/", async (req, res) => {
    try {
        const { customer_id, total_price } = req.body;


        if (!customer_id || !total_price) {
            return res.status(400).json({ message: "Customer ID and total price are required", data: null });
        }

        const newOrder = await ordersController.createOrder(customer_id, total_price);
        res.status(201).json({ message: "Order created successfully", data: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }  
});
  
  
ordersRouter.put("/:id/status", async (req, res) => {

    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required", data: null });
        }
  
        await ordersController.updateOrderStatus(id, status);
        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});
  

module.exports = ordersRouter
