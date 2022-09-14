const {check} = require("express-validator");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../services/User.js");

const validator = {
  form:[
    check("mark").notEmpty().withMessage("campo de marca vacio"),
    check("model").notEmpty().withMessage("campo de modelo vacio"),
    check("price").notEmpty().withMessage("campo de precio vacio"),
    
  ],
  login:[
    check("email")
    .notEmpty()
    .withMessage("campo de email vacio")
    .bail()
    .custom( function(value, {req} ){
      let users = User.findAll();
      let userFound = users.find(user => {
        console.log(user.password);
        return user.email == value && bcrypt.compareSync(req.body.password , user.password)
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
    .withMessage("campo de password vacio"),
    check("email")
    .notEmpty()
    .withMessage("campo vacio email")
    .bail()
    .custom(function(value, {req}){
      let user = User.findByField("email", value);
      if(user){
        throw new Error("Email ya existente en nuestra base!")
      }
      return true
    }),
    check("last_name")
    .notEmpty()
    .withMessage("campo vacio apellido"),
    check("name")
    .notEmpty()
    .withMessage("campo vacio nombre"),
    check("avatar")
    .custom(function( value , {req} ){
      return req.file
    })
    .withMessage("Imagen del avatar requerida!")
    .bail()
    .custom(function( value, {req} ){
      let acceptExtname = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"];
      let extname = path.extname(req.file.originalname);
      return acceptExtname.includes(extname);
      
    })
    .withMessage("Archivo invalido")
    
  ]
}

module.exports = validator;