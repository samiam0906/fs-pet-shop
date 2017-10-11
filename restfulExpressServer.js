var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var petPath = path.join(__dirname,'pets.json');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//READ
app.get('/pets', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var petIndex = Number.parseInt(req.params.id);

    if (petIndex < 0 || petIndex >= pets.length || Number.isNaN(petIndex)) {
      return res.status(404).send('Not Found');
    }

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(pets[petIndex]);
  })
});

//CREATE
app.post('/pets', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var pet = req.body;


    pets.push(pet);
    res.send(pet);
  });
});

//MODIFY
app.put('/pets/:id', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var petIndex = Number.parseInt(req.params.id);
    var pets = JSON.parse(data);
    var pet = req.body;

    pets[petIndex] = pet;
    res.send(pets);
  });
});

//DELETE


app.listen(8000, function() {
  console.log("Listening on server port 8000...");
});
