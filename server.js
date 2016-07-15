"use strict";
let express = require('express');
let path = require('path');
let app = express();

app.use('/assets', express.static('build'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});