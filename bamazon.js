require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: process.env.PASS,
  database: "bamazon"
});

connection.connect() ;

var bamazonT

connection.query('SELECT * FROM products', function(err, results, someFunction){
  if(err){
    console.log(err);
  };
  console.log("Check Out These Sweet Products, Yo");
  bamazonT = console.table(results);
  console.log(bamazonT);
});

inquirer.prompt(
  {
    type: 'number',
    name: 'product_id',
    message: 'Id if product you want to buy',
  },
  {
    type: 'number',
    name: 'quantity',
    message: 'How many would you like to buy?',
  }
).then(function(response, error){
  if(error) throw error;
  console.log(response);
})

connection.end();
