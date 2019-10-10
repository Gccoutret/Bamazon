require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  user: "root",
  port: 3306,

  password: process.env.PASS,
  database: "bamazon"
});

connection.query('SELECT * FROM stock', function(err, results, someFunction){
  if(err){
    console.log(err);
  }
});

function menu(){
  inquirer.prompt{
    
  }
}