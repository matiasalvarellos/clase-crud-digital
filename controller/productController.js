const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator")

function findAll(){
    
  let autosJson= fs.readFileSync(path.join(__dirname, "../data/autos.json"))

  let data = JSON.parse(autosJson)
  return data
}

function writeJson(array){
  //transformamos en un string
  let arrayJson = JSON.stringify(array);
  
  //procesamos la inform en el Json
  return fs.writeFileSync(path.join(__dirname, "../data/autos.json"), arrayJson);

}

const productController = {

  list: function(req, res){
    //obtenemos todos los autos
    let autos = findAll() ;  
    
    //devuelvo la respuesta
    res.render("list", { autos } )

  },
  detail: function(req, res){
    //obtememos todos los autos
    let autos = findAll();

    //busco el producto
    let autoEncontrado = autos.find(function(auto){
      return auto.id == req.params.id
    })

    //duvuelvo la respuesta
    res.render("detail", {auto: autoEncontrado})

  },
  create: function(req, res){

    //duelvo la respuesta
    res.render("product-create-form")

  },
  store: function(req, res){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.render("product-create-form", {
        old: req.body,
        errors: errors.errors
      })
    }

    //busco todos los autos
    let autos = findAll()

    //creo un nuevo auto
    let nuevoAuto = {
      id: autos.length + 1 ,
      mark: req.body.mark ,
      model: req.body.model,
      price: req.body.price ,
      color: req.body.color
    }
    //productos actualizados
    let autosActualizados = [...autos, nuevoAuto]

    //escribo el json
    writeJson(autosActualizados);

    //devuelvo una respuesta
    res.redirect("/products/list");
  },
  edit: function(req, res){
    //busco todos los autos
    let autos = findAll()

    //busco un auto
    let autoEncontrado = autos.find(function(auto){
      return auto.id == req.params.id
    })

    //devuelvo una respuesta
    res.render("product-edit-form", {auto: autoEncontrado})
  },
  update: function(req, res){
    //obtener autos
    let autos = findAll();

    //actualizo mi array
    let autosActualizados = autos.map(function(auto){
      if(auto.id == req.params.id){
        auto.mark = req.body.mark
        auto.model = req.body.model
        auto.color = req.body.color
        auto.price = req.body.price
      }
      return auto
    })
    
    //escribo el json
    writeJson(autosActualizados);

    res.redirect("/products/detail/"+req.params.id)

  },
  destroy: function(req, res){
    //busco todos los autos
    let autos = findAll()

    //filtro los autos que no voy a borrar
    let dataNueva = autos.filter(function(auto){
      return auto.id != req.params.id
    })

    //escribo el json
    writeJson(dataNueva);

    //devuelvo una respuesta
    res.redirect("/products/list");
  }
}

module.exports = productController;