const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");
const User = require("../services/User");
const fs = require("fs");
const path= require("path");



module.exports = {

  login: function(req, res){
    res.render("login")
  },
  processLogin: function(req, res){
    let errors = validationResult(req);

    if(!errors.isEmpty()){


      return res.render("login", {
        old: req.body,
        errors: errors.array()
      })
    }

    let userFound = User.findByField("email" , req.body.email)
  
    req.session.userLogged = userFound.id;

    if(req.body.remember != undefined){
      res.cookie("recordame", userFound.id ,{ maxAge: 60000 * 60 * 240 })
    }
    
    return res.redirect("/");
  },
  register: function(req, res){
    res.render("register");
  },
  processRegister: function(req, res){
    let errors = validationResult(req)

    if(!errors.isEmpty()){

      if(req.file.filename){
        console.log(req.file)
        fs.unlinkSync(path.join(__dirname, `../public/images/avatars/${req.file.filename}`))
      }
      return res.render("register", { errors: errors.mapped() })
    }

    let userId = uuidv4();

    let newUser = {
      id: userId,
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password)
    }

    User.create(newUser);

    req.session.userLogged = newUser.id;

    return res.redirect("/")
  },
  logout: function(req, res){
    req.session.destroy();
    
    res.clearCookie("recordame")

    res.redirect("/")
  }

}