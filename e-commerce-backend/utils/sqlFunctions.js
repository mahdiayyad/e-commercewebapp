const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

const VALID_TABLE_NAMES = [
  "users",
  "product_category",
  "product",
  "discount",
  "product_inventory",
  "product_files",
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

const checkRecordExists = (
  tableName,
  column,
  value,
  dynamicConditions = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      validateTableName(tableName);
      const conditions = Object.keys(dynamicConditions)
        .map((key) => `${key} = ${pool.escape(dynamicConditions[key])}`)
        .join(" AND ");
      const query = `SELECT * FROM ?? WHERE ?? = ? ${
        conditions ? `AND ${conditions}` : ""
      }`;
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

/*
********************************************************************
Example:
wanted = "product.*,prod_files.file_path, prod_inv.quantity, prod_cat.name AS category_name";

relations = {
  'product_files': 'LEFT JOIN product_files AS prod_files ON product.id = prod_files.product_id',
  'product_inventory': 'LEFT JOIN product_inventory AS prod_inv ON product.inventory_id = prod_inv.id',
  'product_category': 'LEFT JOIN product_category AS prod_cat ON product.category_id = prod_cat.id',
}

conditions = {
  'where': 'id = something',
  'having': 'count > or < or = something',
  'group by': '',
  'order by': 'product.id ASC',
  etc...
}
********************************************************************
*/
const getAllRelations = (
  tableName,
  wanted = "*",
  relations = {},
  conditions = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      validateTableName(tableName);
      let query = `SELECT ${wanted} FROM ??`;
      const queryParams = [tableName];

      if (Object.keys(relations).length > 0) {
        const joinStatements = Object.values(relations).join(" ");
        query += ` ${joinStatements}`;
      }

      if (Object.keys(conditions).length > 0) {
        for (const [key, value] of Object.entries(conditions)) {
          query += ` ${key.toUpperCase()} ${value}`;
        }
      }

      pool.query(query, queryParams, (err, results) => {
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
  getAllRelations,
};
