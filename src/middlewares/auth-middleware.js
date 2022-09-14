module.exports = (req, res, next) =>{
  if(req.session.userLogged){
    if(req.session.userLogged.role === 'admin'){
      return next();
    }
  }
  return res.redirect("/")
}