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

async function getOrdersById(ordersId) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT orders.*, customer.customer_name
      FROM orders
      JOIN customer ON orders.customer_id = customer.customer_id
      WHERE orders.orders_id = ?
    `, 
      [ordersId],
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

async function createOrders(customer_id, total_price, status) {
  const ordersId = uuid();
  const result_query = await new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO orders (orders_id, customer_id, total_price, status)
      VALUES (?, ?, ?, ?)
    `, 
      [ordersId, customer_id, total_price, status],
      function(error) {
        if (error) {
          reject(error);
        } else {
          resolve({ orders_id: ordersId });
        }
      }
    )
  });
  return result_query;
}

async function updateOrders(id, { status, total_price }) {
  const result_query = await new Promise((resolve, reject) => {
    db.run(`
      UPDATE orders
      SET status = ?, total_price = ?, updated_at = CURRENT_TIMESTAMP
      WHERE orders_id = ?
    `, 
      [status, total_price, id],
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

// Export 
const ordersController = {
  getAllOrders,
  getOrdersById,
  createOrders,
  updateOrders
};

module.exports = ordersController;
