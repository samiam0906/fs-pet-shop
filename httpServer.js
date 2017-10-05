var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res) {
  var urlArray = req.url.split("/");
  var urlLength = urlArray.length;
  var index = parseInt(urlArray[urlLength - 1]);

  if (req.method == 'GET' && (req.url == '/pets' || req.url == '/pets/')) {
    fs.readFile('pets.json', function(err,data){
      if (err) {
        throw err;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
    // res.end('You have entered the pet zone');
  } else if (req.method == 'GET' && index !== NaN) {
    fs.readFile('pets.json', function(err,data){
      if (err) {
        throw err;
      }

      var pets = JSON.parse(data);
      data = JSON.stringify(pets[index]);
      if (pets[index]) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }

  console.log("req.method: " + req.method);
  console.log("req.url: " + req.url);
  console.log("path: " + urlArray[1]);
  console.log("index: " + index);
});

server.listen(8000, function(){
  console.log("Server listening on port 8000...");
});

module.exports = server;
