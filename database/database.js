const mysql = require("mysql");

 

const mySqlConnection = mysql.createConnection({

host: "localhost",

user: "root",

password: "Ajinkya@5555",

database: "ecommerce"

});

 

mySqlConnection.connect(err => {

if (err) console.log(err);

console.log("Database Connected!");

});

 

module.exports = mySqlConnection;