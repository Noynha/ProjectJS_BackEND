const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getAllOrders() {
    const result_query = await new Promise((resolve, reject) => {
      db.all(`
        SELECT orders.*, customer.customer_name
        FROM orders
        JOIN customer ON orders.customer_id = customer.customer_id
      `, 
        [],
        function(error, data) {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      )
    });
    return result_query;
  }
  
  async function getOrderById(orderId) {
    const result_query = await new Promise((resolve, reject) => {
      db.all(`
        SELECT orders.*, customer.customer_name
        FROM orders
        JOIN customer ON orders.customer_id = customer.customer_id
        WHERE orders.orders_id = ?
      `, 
        [orderId],
        function(error, data) {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      )
    });
    return result_query?.[0];
  }
  
  async function createOrder(customer_id, total_price, status = "Pending") {
    const orderId = uuid();
    const result_query = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO orders (orders_id, customer_id, total_price, status)
        VALUES (?, ?, ?, ?)
      `, 
        [orderId, customer_id, total_price, status],
        function(error) {
          if (error) {
            reject(error);
          } else {
            resolve({ orders_id: orderId });
          }
        }
      )
    });
    return result_query;
  }
  
  async function updateOrderStatus(orderId, status) {
    const result_query = await new Promise((resolve, reject) => {
      db.run(`
        UPDATE orders
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE orders_id = ?
      `, 
        [status, orderId],
        function(error) {
          if (error) {
            reject(error);
          } else {
            resolve({ message: "Order status updated successfully" });
          }
        }
      )
    });
    return result_query;
  }
  
  // Export 
  const ordersController = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus
  };

module.exports = tastordersController