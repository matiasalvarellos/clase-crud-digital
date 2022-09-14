const path = require("path");
const fs = require("fs");


let user = {
  readFile: function () {
    let data = fs.readFileSync(
      path.join(__dirname, "../data/users.json"),
      "utf-8"
    );
    return JSON.parse(data);
  },
  writeFile: function (data) {
    let dataJson = JSON.stringify(data, null, " ");
    return fs.writeFileSync(
      path.join(__dirname, "../data/users.json"),
      dataJson
    );
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
  findByField: function (attribute, valueInput) {
    let users = this.findAll();
    let userFound = users.find((user) => user[attribute] == valueInput);
    return userFound;
  },
  create: function (user) {
    let users = this.findAll();
    users.push(user);
    return this.writeFile(users);
  },
};

module.exports = user