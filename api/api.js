var express = require('express');
var app = express();
var dotenv = require('dotenv').config({ path: '.env' });
var PORT = 3000;

var gcloud = require('google-cloud');
var vision = require('@google-cloud/vision');
var visionClient = vision({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.FILE_PATH
});

var language = require('@google-cloud/language');
var languageClient = language({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.FILE_PATH
});

var imageText = [];

visionClient.detectText('IMG_2132.jpg', function(err, text) {
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

app.listen(PORT, function() {
  console.log('listening on ' + PORT);
})
