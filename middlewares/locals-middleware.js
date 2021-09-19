module.exports = (req, res, next)=>{

  res.locals.userSession = false;

  if(req.session.userLogged){
    res.locals.userSession = req.session.userLogged
  }
  
  next() 
}