const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/db/database.sqlite');

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
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
  )
`, 
    [],
    function(error) {
      if (error) {
        throw new Error(error);
      }
    }
);

// Create table order_detail
db.run(`
  CREATE TABLE IF NOT EXISTS order_detail (
    orders_detail_id binary(16) PRIMARY KEY,
    orders_id binary(16),
    product_id binary(16),
    program_id binary(16),
    item int(20),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES program(product_id),
    FOREIGN KEY (program_id) REFERENCES program(program_id)
  )
`, 
    [],
    function(error) {
      if (error) {
        throw new Error(error);
      }
    }
);
