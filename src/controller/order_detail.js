const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getAllOrderDetail() {
    const result_query = await new Promise((resolve, reject) => {
        db.all(`
            SELECT order_detail.*, orders.orders_id, product.product_id, program.program_id
            FROM order_detail
            LEFT JOIN orders ON order_detail.orders_id = orders.orders_id
            LEFT JOIN product ON order_detail.product_id = product.product_id
            LEFT JOIN program ON order_detail.program_id = program.program_id
        `, 
        [], // ใช้ [] หากไม่มีพารามิเตอร์เพิ่มเติมใน query
        function(error, rows) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);  // แก้เป็น 'rows' แทน 'data'
            }
        });
    });
    return result_query;
}

  async function getOrderDetailById(orderDetailId) {
    const result_query = await new Promise((resolve, reject) => {
      db.all(`
        SELECT order_detail.*
        FROM order_detail
        WHERE order_detail.orders_detail_id = ?
      `, 
        [orderDetailId],
        function(error, data) {
          if (error) {
            reject(error);
          } else {
            console.log(data)
            resolve(data);
          }
        }
      )
    });
    return result_query?.[0];
  }


  async function createOrdersDetail(orders_id,product_id,program_id,item) {
    const orderDetailId = uuid();
    const result_query = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO order_detail (orders_detail_id,orders_id,product_id,program_id,item)
        VALUES (?, ?, ?, ?, ?)
      `, 
        [orderDetailId,orders_id,product_id,program_id,item],
        function(error) {
          if (error) {
            reject(error);
          } else {
            resolve({ orders_id: orderDetailId });
          }
        }
      )
    });
    return result_query;
  }
  
  async function updateOrderDetail(id, { item }) {
    const result_query = await new Promise((resolve, reject) => {
      db.run(`
        UPDATE order_detail
        SET item = ?, updated_at = CURRENT_TIMESTAMP
        WHERE orders_detail_id = ?
      `, 
        [ item , id],
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

  async function deleteOrderDetail(id) {
    const result_query = await new Promise((resolve, reject) => {
      db.all(`
        DELETE FROM order_detail
        WHERE orders_detail_id = ?
      `, [id], function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    return result_query;
  }


  // Export 
const orderDetailController = {
    getAllOrderDetail,
    getOrderDetailById,
    createOrdersDetail,
    updateOrderDetail,
    deleteOrderDetail
  };
  
  module.exports = orderDetailController;