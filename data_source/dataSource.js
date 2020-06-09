const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10, //important
  host     : '************.eu-west-3.rds.amazonaws.com',
  user     : 'o3_user',
  password : '*****',
  database : 'mydb',
  port     : "3306",
  waitForConnections: true,
  debug    :  false

});
module.exports = pool;
