const mainController = {
  home: (req, res) =>{
    console.log(req.session);
    res.render("index")
  }
}

module.exports = mainController;
