const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getOnceCustomerByName(name) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM customer
      WHERE customer_name = ?
    `, 
      [name],
      function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    )
  })
  return result_query?.[0];
}

async function getOnceCustomerById(id) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM customer
      WHERE customer_id = ?
    `, 
      [id],
      function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    )
  })
  return result_query?.[0];
}

async function getManyCustomer() {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM customer
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

async function createCustomer(name, phone) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      INSERT INTO customer
        (customer_id, customer_name, customer_phone)
      VALUES
        (?, ?, ?)
    `, 
      [uuid(), name, phone],
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


// Exports
const customerController = {
  getOnceCustomerByName,
  getOnceCustomerById,
  getManyCustomer,
  createCustomer
}

module.exports = customerController