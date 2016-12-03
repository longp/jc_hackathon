var express = require("express");
var app = express()
var expses = require('express-session');
var bodyParser = require("body-parser");
var path = require('path');
var mongoose = require('mongoose');
const PORT = process.env.PORT || 1337

var dotenv = require('dotenv').config({ path: '.env' });


var gcloud = require('google-cloud');
var vision = require('@google-cloud/vision');
var language = require('@google-cloud/language');



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

var visionClient = vision({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.FILE_PATH
});

var languageClient = language({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.FILE_PATH
});

var imageText = [];

visionClient.detectText('http://johnlewis.scene7.com/is/image/JohnLewis/231283644?$prod_exlrg$', function(err, text) {
  if (err) {
    throw err
  } else {
    var text = text.join(" ");
    languageClient.detectEntities(text, function(err, entities) {
      if (err) {
        throw err
      } else {
        console.log(entities);
      }
    });
  }
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/views/index.html")
})

app.listen(PORT, function(){
  console.log("listening on", PORT)
})
