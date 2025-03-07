const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/db/database.db');

// Create table customer
db.run(`
  CREATE TABLE IF NOT EXISTS customer (
    customer_id binary(16) PRIMARY KEY,
    customer_name varchar(40),
    customer_phone varchar(10),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
  )
`, 
    [],
    function(error) {
      if (error) {
        throw new Error(error);
      }
    }
);

// Create table product
db.run(`
  CREATE TABLE IF NOT EXISTS product (
    product_id binary(16) PRIMARY KEY,
    product_type varchar(40),
    product_price float(20),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
  )
`, 
    [],
    function(error) {
      if (error) {
        throw new Error(error);
      }
    }
);
