var fs = require('fs');
var filePath = process.argv[1];
// read or create or update or destroy
var cmd = process.argv[2];
// index of parsed JSON data or age as a number
var cmd2 = process.argv[3];


// if (cmd == 'read') {
//   fs.readFile('pets.json', function(err, data){
//     var pets = JSON.parse(data);
//     console.log(pets);
//   })
// }

if (process.argv[2] == undefined) {
  console.log("Usage: enter a command after file path");
  process.exit();
} else if (cmd == 'read' && cmd2 !== undefined) {
  fs.readFile('pets.json', function(err, data){
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    if (pets[cmd2] == undefined) {
      console.log("Usage: node " + filePath + " " + cmd + " INDEX");
      process.exit();
    } else {
      var chosenPet = pets[cmd2];
      console.log(chosenPet);
    }
  })
}

if (cmd == 'create') {
  fs.readFile('pets.json', function(err, data){
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    var age = process.argv[3]
    var kind = process.argv[4];
    var name = process.argv[5];

    if (!age || !kind || !name) {
      console.log("Usage: node " + filePath + " " + cmd + " AGE KIND NAME");
      process.exit();
    }

    var pet = {age , kind, name};

    pets.push(pet);

    var petJSON = JSON.stringify(pets);
    fs.writeFile('pets.json', petJSON, function(err){
      if (err) {
        throw err;
      }
    })
  })
}

if (cmd == 'update') {
  fs.readFile('pets.json', function(err, data){
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var age = process.argv[4];
    var kind = process.argv[5];
    var name = process.argv[6];

    if (!age || !kind || !name) {
      console.log("Usage: node " + filePath + " " + cmd + " INDEX AGE KIND NAME");
      process.exit();
    }

    var updatedPet = {age, kind, name};
    if (cmd2) {
      pets[cmd2] = updatedPet;
    }
    var petJSON = JSON.stringify(pets);

    fs.writeFile('pets.json', petJSON, function(err) {
      if (err) {
        throw (err);
      }
    })

  })
}

if (cmd = 'destroy') {
  fs.readFile('pets.json', function(err,data){
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    if (!index) {
      console.log("Usage: node " + filePath + " " + cmd + " INDEX");
      process.exit();
    }

    if (index) {
      pets.splice(index, 1);
    }
    var petJSON = JSON.stringify(pets);

    fs.writeFile('pets.json', petJSON, function(err){
      if (err) {
        throw err;
      }
    })
  });
}
