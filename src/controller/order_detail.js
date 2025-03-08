const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getAllOrderDetail() {
    const result_query = await new Promise((resolve, reject) => {
      db.all(`
        SELECT order_detail.*, orders.orders_id, product.product_id, program.program_id
        FROM order_detail
        JOIN orders ON order_detail.orders_id = orders.orders_id
        JOIN product ON order_detail.product_id = product.product_id
        JOIN program ON order_detail.program_id = program.program_id
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
    })
    return result_query;
  }

  async function getOrderDetailById(orderDetailId) {
    const result_query = await new Promise((resolve, reject) => {
      db.all(`
        SELECT orders_detail.*, orders.orders_id, porduct.product_id, program.program_id
        FROM order_detail
        JOIN orders ON order_detail.orders_id = orders.orders_id,
        JOIN product ON order_detail.product_id = product.product_id,
        JOIN program ON order_detail.program_id = program.program_id
        WHERE order_detail.orders_detail_id = ?
      `, 
        [orderDetailId],
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

  // Export 
const orderDetailController = {
    getAllOrderDetail,
    getOrderDetailById
    
  };
  
  module.exports = orderDetailController;