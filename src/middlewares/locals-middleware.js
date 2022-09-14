let User = require("../services/User");

module.exports = (req, res, next)=>{

  res.locals.userSession = false;
  
  
  if(req.session.userLogged){
    let user = User.findByPk(req.session.userLogged)
    res.locals.userSession = user
  }
  
  next() 
}