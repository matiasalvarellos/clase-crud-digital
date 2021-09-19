module.exports = (req, res, next) => {
  if(!req.session.userLogged){
    return next()
  }
  return res.redirect("/")
}