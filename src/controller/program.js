const db = require("../db/init-db");
const { uuid } = require("uuidv4");

async function getOnceProgramByType(type) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM program
      WHERE program_type = ?
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

async function getOnceProgram(id) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM program
      WHERE program_id = ?
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

async function getAllPrograms() {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM program
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

async function createProgram(type, price) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      INSERT INTO program (program_id, program_type, program_price)
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

async function updateProgram(id, { type, price }) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      UPDATE program
      SET program_type = ?, program_price = ?
      WHERE program_id = ?
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

async function deleteProgram(id) {
  const result_query = await new Promise((resolve, reject) => {
    db.all(`
      DELETE FROM program
      WHERE program_id = ?
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
const programController = {
  getOnceProgramByType,
  getOnceProgram,
  getAllPrograms,
  createProgram,
  updateProgram,
  deleteProgram
};

module.exports = programController;
