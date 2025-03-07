const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getOnceProductByType(type) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM product
      WHERE product_type = ?
    `, [type], function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  return result_query?.[0]; 
}

async function getOnceProductById(id) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM product
      WHERE product_id = ?
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

async function getManyProducts() {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM product
    `, [], function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data); 
      }
    });
  });
  return result_query; 
}

async function createProduct(type, price) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      INSERT INTO product (product_id, product_type, product_price)
      VALUES (?, ?, ?)
    `, [uuid(), type, price], function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  return result_query;
}

async function updateProduct(id, { type, price }) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      UPDATE product
      SET product_type = ?, product_price = ?
      WHERE product_id = ?
    `, [type, price, id], function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  return result_query;
}

async function deleteProduct(id) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      DELETE FROM product
      WHERE product_id = ?
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

// Exports
const productController = {
  getOnceProductByType,
  getOnceProductById,
  getManyProducts,
  createProduct,
  updateProduct,
  deleteProduct
};

module.exports = productController;
