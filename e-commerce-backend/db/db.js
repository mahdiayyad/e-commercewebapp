const mysql = require("mysql");
const config = require("./config");

const connectDB = async () => {
  const pool = mysql.createPool(config);

  try {
    const connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });

    console.log("Connected to MySQL database");
    connection.release();
  } catch (err) {
    console.error("Error connecting to MySQL database:", err);
  }
};

module.exports = connectDB;
