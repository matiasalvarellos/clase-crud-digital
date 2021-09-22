const fs = require("fs");
const path = require("path");

let autosJson= fs.readFileSync(path.join(__dirname, "../data/autos.json"))
  //parsear la inform
let dataAutos = JSON.parse(autosJson)

function writeJson(array){
  //transformamos en un string
  let arrayJson = JSON.stringify(array, null, 4);
  
  //procesamos la inform en el Json
  return fs.writeFileSync(path.join(__dirname, "../data/autos.json"), arrayJson);

}

const productController = {

  list: function(req, res){
    //obtenemos todos los autos  
    //devuelvo la respuesta
    res.render("list", { autos: dataAutos } )

  },
  detail: function(req, res){
    //busco el producto
    let autoEncontrado = dataAutos.find(function(auto){
      return auto.id == req.params.id
    })

    //duvuelvo la respuesta
    res.render("detail", {auto: autoEncontrado})

  },
  create: function(req, res){

    //duelvo la respuesta
    res.render("product-create-form.ejs")

  },
  store: function(req, res){
    function getId(){
      let lastProduct = dataAutos[dataAutos.length - 1];
      let id = dataAutos.length > 0 ? lastProduct.id + 1 : 1
      return id
    } 

    //creo un nuevo auto
    let nuevoAuto = {
      id: getId() ,
      mark: req.body.mark ,
      model: req.body.model,
      price: req.body.price ,
      color: req.body.color
    }
    
    dataAutos.push(nuevoAuto)

    //escribo el json
    writeJson(dataAutos);

    //devuelvo una respuesta
    res.redirect("/products/list");
  },
  edit: function(req, res){
    //busco un auto
    let autoEncontrado = dataAutos.find(function(auto){
      return auto.id == req.params.id
    })

    //devuelvo una respuesta
    res.render("product-edit-form", {auto: autoEncontrado})
  },
  update: function(req, res){
    //actualizo mi array
    dataAutos = dataAutos.map(function(auto){
      if(auto.id == req.params.id){
        auto.mark = req.body.mark
        auto.model = req.body.model
        auto.color = req.body.color
        auto.price = req.body.price
      }
      return auto
    })
    
    //escribo el json
    writeJson(dataAutos);

    res.redirect("/products/detail/"+req.params.id);

  },
  destroy: function(req, res){

    //filtro los autos que no voy a borrar
    let autoIndex = dataAutos.findIndex(auto=> auto.id == req.params.id)

    dataAutos.splice(autoIndex, 1)

    //escribo el json
    writeJson(dataAutos);

    //devuelvo una respuesta
    res.redirect("/products/list");
  }
}

module.exports = productController;