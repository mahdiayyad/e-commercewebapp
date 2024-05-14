const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

const VALID_TABLE_NAMES = [
  "users",
  "product_category",
  "product",
  "discount",
  "product_inventory",
];

const validateTableName = (tableName) => {
  if (!VALID_TABLE_NAMES.includes(tableName)) {
    throw new Error("Invalid table name");
  }
};

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    try {
      validateTableName(tableName);
      const query = `SELECT * FROM ?? WHERE ?? = ?`;
      pool.query(query, [tableName, column, value], (err, results) => {
        if (err) reject(err);
        else resolve(results.length ? results[0] : null);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    try {
      validateTableName(tableName);
      const query = `INSERT INTO ?? SET ?`;
      pool.query(query, [tableName, record], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateRecord = (tableName, record, id) => {
  return new Promise((resolve, reject) => {
    try {
      validateTableName(tableName);
      const query = `UPDATE ?? SET ? WHERE id = ?`;
      pool.query(query, [tableName, record, id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllRecords = (tableName) => {
  return new Promise((resolve, reject) => {
    try {
      validateTableName(tableName);
      const query = `SELECT * FROM ??`;
      pool.query(query, [tableName], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteRecord = (tableName, id) => {
  return new Promise((resolve, reject) => {
    try {
      validateTableName(tableName);
      if (typeof id !== "number" || id <= 0) {
        return reject(new Error("Invalid ID"));
      }
      const query = `DELETE FROM ?? WHERE id = ?`;
      pool.query(query, [tableName, id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  updateRecord,
  getAllRecords,
  deleteRecord,
};
