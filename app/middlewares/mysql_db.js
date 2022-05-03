const mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_prisma"
});


module.exports = con;
