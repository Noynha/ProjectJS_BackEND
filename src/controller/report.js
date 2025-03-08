const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getReport() {
    const result_query = await new Promise((resolve, reject) => {
        db.all(`
            SELECT orders.orders_id, customer.customer_name,orders.drop_at,orders.take_at,orders.status,product.product_type,order_detail.item,product.product_price,orders.total_price
            FROM order_detail
            LEFT JOIN customer ON 
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





