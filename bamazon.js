require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var chosenId
var quant
var bamazonT
var price
var totalStock
var counter = 0;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: process.env.PASS,
  database: "bamazon"
});

connection.connect() ;

showTable()

function showTable(){
connection.query('SELECT * FROM stock', function(err, results, someFunction){
  if(err){
    console.log(err);
  };
  console.log("Check Out These Sweet Products");
  console.table(results);
  if(counter===0){
    sellItem();
  } else {
    connection.end()
  }  
});

}
function sellItem(){
  counter++;
  inquirer.prompt(
    {
      type: 'number',
      name: 'product_id',
      message: 'Id of product you want to buy',
    }).then(function(response, error){
      if(error) throw error;
      chosenId=response.product_id
      findInfo();
    })
}
function findInfo(){
  connection.query('SELECT * FROM stock WHERE product_id ='+chosenId, function(err, response, someFunction){
    price = response[0].price;
    totalStock= response[0].quantity;
    howMany();
  })
}

function howMany(){
inquirer.prompt(
  {
    type: 'number',
    name: 'quantity',
    message: 'How many would you like to buy?',
  }
).then(function(response, error){
  if(error) throw error;
  quant= response.quantity
  if(quant > totalStock){
    console.log("We dont have enough of that item to support your greedy wants.")
    connection.end();
  }else{
    makeSale()
    }
  })
}

function makeSale(){
  var totalPrice= price*quant;
  var updateQuant= totalStock-quant;
  console.log("Your sale will be complete after your payment of $"+totalPrice+ ".")
  connection.query('UPDATE stock SET ? WHERE ?',[{quantity: updateQuant},{product_id:chosenId}], function(err, results ,someFunction){
    showTable();
  })
}











