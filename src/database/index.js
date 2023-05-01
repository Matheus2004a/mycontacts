const mysql = require('mysql');

const database = mysql.createConnection(process.env.DATABASE_URL);

exports.query = async (query, values = '') => new Promise((resolve, reject) => {
  database.query(query, values, (error, result) => {
    if (error) reject(error);

    resolve(result);
  });
});
