const {check} = require("express-validator");
const User = require("../models/User.js");

const validator = {
  form:[
    check("mark").notEmpty().withMessage("campo de marca vacio"),
    check("model").notEmpty().withMessage("campo de modelo vacio"),
    check("price").notEmpty().withMessage("campo de precio vacio"),
    check("color").notEmpty().withMessage("campo de color vacio")
  ],
  login:[
    check("email")
    .notEmpty()
    .withMessage("campo de email vacio")
    .bail()
    .custom(function(value, {req} ){
      let users = User.findAll();
      let userFound = users.find(user => {
        return user.email == value && user.password == req.body.password
      })
      if(!userFound){
        throw new Error("email o contraseña invalidos");
      }
      return true
    }),
    check("password")
    .notEmpty()
    .withMessage("campo de password vacio")
  ],
  register:[
    check("password")
    .notEmpty()
    .withMessage("campo de password vacio")
  ]
}

module.exports = validator;