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

async function createOrders(customer_id, status, drop_at, take_at) {
  const ordersId = uuid()

  // คำนวณ total_price จาก order_detail
  const total_price = await new Promise((resolve, reject) => {
    db.get(
        `
        SELECT 
            SUM(product.product_price * order_detail.quantity + program.program_price) AS total_price
        FROM order_detail 
        JOIN product ON order_detail.product_id = product.product_id
        JOIN program ON order_detail.program_id = program.program_id
        WHERE order_detail.order_id = ?
        `,
        [ordersId],
        function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data?.total_price || 0);
            }
        }
    );
  });

  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      INSERT INTO orders (orders_id, customer_id, total_price, status, drop_at, take_at)
      VALUES (?, ?, ?, ?, ? ,?)
    `, 
      [ordersId, customer_id, total_price, status, drop_at, take_at],
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

async function updateOrders(id, { status, drop_at, take_at }) {
  const result_query = await new Promise((resolve, reject) => {
    db.run(`
      UPDATE orders
      SET status = ?, drop_at = ?, take_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE orders_id = ?
    `, 
      [status, drop_at, take_at, id],
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
