const db = require("../db/init-db");
const { uuid } = require("uuidv4");
const moment = require('moment');

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

// คำนวณ total_price จาก order_detail
async function calculateTotalPrice(orders_id) {
  return new Promise((resolve, reject) => {
      db.get(`
          SELECT 
              SUM((product.product_price * order_detail.item) + (program.program_price*order_detail.item)) AS total_price
          FROM order_detail
          JOIN product ON order_detail.product_id = product.product_id
          JOIN program ON order_detail.program_id = program.program_id
          WHERE order_detail.orders_id = ?
      `, [orders_id], (error, data) => {
          if (error) reject(error);
          else resolve(data?.total_price || 0);
      });
  });
}

// create Orders โดยทที่ total_price = 0
async function createOrders( customer_id, drop_at, take_at ) {
  const ordersId = uuid()

  const drop_at_date = moment(drop_at?.split(" ")?.[0],"YYYY-MM-DD")
  const current_date = moment().startOf("day")
  const isorder_waiting = drop_at_date.startOf("day").isAfter(current_date)
  const orders_status = isorder_waiting ? "waiting" : "in-progress"
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      INSERT INTO orders (orders_id, customer_id, total_price, status, drop_at, take_at)
      VALUES (?, ?, ?, ?, ? ,?)
      RETURNING *
    `, 
      [ordersId, customer_id, 0, orders_status, drop_at, take_at],
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

// async function updateOrderStatusByDate() {
//   return new Promise((resolve, reject) => {
//       db.run(`
//           UPDATE orders
//           SET status = 
//               CASE 
//                   WHEN date('now') >= drop_at AND date('now') < take_at THEN 'Doing laundry'
//                   WHEN date('now') >= take_at THEN 'Ready for pickup , Success'
//                   ELSE status
//               END
//       `, [], function (error) {
//           if (error) reject(error);
//           else resolve(true);
//       });
//   });
// }

async function updateOrdersTotalPrice(orders_id, total_price) {
  return new Promise((resolve, reject) => {
      db.run(`
          UPDATE orders
          SET total_price = ?, updated_at = CURRENT_TIMESTAMP
          WHERE orders_id = ?
      `, [total_price, orders_id], function (error) {
          if (error) reject(error);
          else resolve(true);
      });
  });
}

async function updateOrders(id, { status,  drop_at, take_at }) {
  const result_query = await new Promise((resolve, reject) => {
    db.run(`
      UPDATE orders
      SET  status = ?, drop_at = ?, take_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE orders_id = ?
    `, 
      [ status, drop_at, take_at, id],
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
  calculateTotalPrice,
  createOrders,
  // updateOrderStatusByDate,
  updateOrdersTotalPrice,
  updateOrders,
  deleteOrders
};

module.exports = ordersController;
