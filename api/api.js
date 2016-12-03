var express = require('express');
var app = express();
require('dotenv').config();
var PORT = 3000;

dotenv.load({ path: '.env' });
var gcloud = require('google-cloud');
var vision = gcloud.vision;

var vision = require('@google-cloud/vision');
var visionClient = vision({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.FILE_PATH
});


visionClient.detectText('./IMG_2018.jpg', function(err, text) {
  console.log(err)
  console.log(text)
});


app.listen(PORT, function() {
  console.log('listening on ' + PORT);
})
