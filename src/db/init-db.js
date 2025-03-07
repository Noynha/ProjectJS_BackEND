const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/db/database.db');

// Create table customer
db.run(`
  CREATE TABLE IF NOT EXISTS customer (
    customer_id binary(16) PRIMARY KEY,
    customer_name varchar(255),
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