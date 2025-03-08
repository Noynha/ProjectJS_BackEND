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
  return result_query;
}

async function createOrders(customer_id, total_price, status, drop_at, take_at) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      INSERT INTO orders (orders_id, customer_id, total_price, status, drop_at, take_at)
      VALUES (?, ?, ?, ?, ? ,?)
    `, 
      [uuid(), customer_id, total_price, status, drop_at, take_at],
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

async function deleteOrders(id) {
    const result_query = await new Promise((resolve, reject) => {
      db.all(`
        DELETE FROM orders
        WHERE orders_id = ?
      `, [id], function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    return result_query?.[0];
  }

// Export 
const ordersController = {
  getAllOrders,
  getOrdersById,
  createOrders,
  updateOrders,
  deleteOrders
};

module.exports = ordersController;
