var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var petPath = path.join(__dirname,'pets.json');


app.get('/pets', function(req,res){
  fs.readFile(petPath, 'utf8', function(err,data){
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    res.send(pets);
    res.status(200);
  });
})

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

    res.send(pets[petIndex]);
    res.status(200);
  })
});

app.use(function(req, res){
  res.status(404).send("Not Found");
});


// app.get('/pets/:id', function(req,res){
//   fs.readFile('pets.json', function(err,data){
//     if (err) {
//       throw err;
//     }
//
//     var pets = JSON.parse(data);
//     var petIndex = parseInt(req.params.id);
//     res.send(pets[petIndex]);
//     res.status(200);
//   });
// });

app.listen(8000, function(){
  console.log("Listening on port 8000...")
});
