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

// Create table program
db.run(`
  CREATE TABLE IF NOT EXISTS program (
    program_id binary(16) PRIMARY KEY,
    program_type varchar(40),
    program_price float(20),
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

// Create table order
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    orders_id binary(16) PRIMARY KEY,
    customer_id binary(16),
    total_price float(20),
    status varchar(40),
    drop_at timestamp DEFAULT CURRENT_TIMESTAMP,
    take_at timestamp DEFAULT CURRENT_TIMESTAMP,
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
