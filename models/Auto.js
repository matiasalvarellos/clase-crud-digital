const path = require("path");
const fs = require("fs");

let auto = {
  readFile: function () {
    let data = fs.readFileSync(path.join( __dirname, "../data/autos.json"), "utf-8" );
    return JSON.parse(data);
  },
  writeFile: function(data){
    let dataJson = JSON.stringify(data, null, " ");
    return fs.writeFileSync( path.join( __dirname, "../data/autos.json"), dataJson);
  },
  findAll: function () {
    let usersAll = this.readFile();
    return usersAll;
  },
  findByPk: function (id) {
    let users = this.findAll();
    let userFound = users.find((user) => user.id == id);
    return userFound;
  },
  create: function(auto){
    let autos = this.findAll();
    autos.push(auto);
    return this.writeFile(autos);
  }
};
