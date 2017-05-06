
var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    fs.writeFile(__dirname+"/post.json", req.body, function(err) {
        if(err) {
        return console.log(err);
        }
        res.send('The file was saved!');
    }); 
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});