const mysql = require('mysql');

const database = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.query = async (query, values = '') => new Promise((resolve, reject) => {
  database.query(query, values, (error, result) => {
    if (error) reject(error);

    resolve(result);
  });
});
