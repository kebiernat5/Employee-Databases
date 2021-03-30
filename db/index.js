const mysql = require("mysql");
const util = require("util");
// creates connection to mysql
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db"
});
// connects to server using connection
connection.connect();
//creates promise using util on connection.query
connection.query = util.promisify(connection.query);
//exports connection to be used in index.js not in db folder
module.exports = connection;









// const mysql = require("mysql");
// const util = require("util");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "workPlace_DB",
// });

// connection.connect();

// connection.query = util.promisify(connection.query);

// module.exports = connection;