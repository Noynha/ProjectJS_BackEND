const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getReport() {
    const result_query = await new Promise((resolve, reject) => {
        db.all(`
        SELECT 
            orders.orders_id,
            customer.customer_name,
            GROUP_CONCAT(DISTINCT product.product_type) AS product_types,
            SUM(order_detail.item) AS total_item,
            SUM(product.product_price) AS total_product_price,
            SUM(program.program_price) AS total_program_price,
            orders.total_price,
            orders.status,
            orders.drop_at,
            orders.take_at
        FROM
            orders
        LEFT JOIN
            customer ON customer.customer_id = orders.customer_id
        LEFT JOIN
            order_detail ON order_detail.orders_id = orders.orders_id
        LEFT JOIN
            product ON product.product_id = order_detail.product_id    
        LEFT JOIN
            program ON program.program_id = order_detail.program_id
        GROUP BY
            orders.orders_id, 
            customer.customer_name,
            orders.total_price,
            orders.status,
            orders.drop_at,
            orders.take_at
        ORDER BY 
            orders.created_at DESC
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


const reportController = {
    getReport
  };
  
  module.exports = reportController;


