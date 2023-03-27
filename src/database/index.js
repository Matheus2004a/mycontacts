const mysql = require('mysql');

const database = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'bd_mycontacts',
});

exports.query = async (query, values = '') => new Promise((resolve, reject) => {
  database.query(query, values, (error, result) => {
    if (error) reject(error);

    resolve(result);
  });
});
