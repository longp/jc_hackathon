var express = require("express");
var app = express()
var expses = require('express-session');
var bodyParser = require("body-parser");
var path = require('path');
var mongoose = require('mongoose');
const PORT = process.env.PORT || 1337



// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expses({
  secret: 'keyboard cat rocks',                                               //CHANGE FOR AN ENV VARIABLE LATER FOR PROD
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (7 * 24 * 60 * 60 * 1000) } // 7 Days
}));
app.use("/js", express.static(path.join(__dirname, 'public/js')));
app.use("/views", express.static(path.join(__dirname, 'views')));



app.get("/", function(req,res){
  res.sendFile(__dirname + "/views/index.html")
})

app.listen(PORT, function(){
  console.log("listening on", PORT)
})
