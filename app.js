var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();
require('dotenv').config();
const PORT=3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'join_us',
  password:process.env.DB_PASSWORD
});

app.get("/", function(req, res){
    // Find count of users in DB
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;
        var count = results[0].count; 
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) console.log(err);
        res.redirect("/");
    });
});

app.listen(PORT, function(){
    console.log("Server running on "+PORT);
});