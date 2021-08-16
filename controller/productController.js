const fs = require("fs");
const path = require("path");

function findAll(){

  //leer archivo json
  let autosJson = fs.readFileSync(path.join(__dirname, "../data/autos.json"));
  //parsear la inform
  return JSON.parse(autosJson);
}

function writeJson(array){
  //convertir en string la inform
  let jsonData = JSON.stringify(array, null, " ");

  //guardar en json
  return fs.writeFileSync(path.join(__dirname, "../data/autos.json"), jsonData)
}

const productController = {

  list: function(req, res){
    //obtener autos
    let autos = findAll();
    

    //generar una respuesta al usuario
    res.render("list", { autos:autos })
  },
  detail: function(req,res){
    //obtener autos
    let autos = findAll()
    
    //buscar el auto
    let autoEncontrado =  autos.find(function(auto){
      return auto.id == req.params.id
    })

    //evaluar que encontre el auto y generar una respuesta
    if(!autoEncontrado){
      return res.send("error")
    }
    res.render("detail", { auto: autoEncontrado })

  },
  create: function(req, res){
    res.render("product-create-form")
  },
  store: function(req, res){
    //obtengo los autos
    let autos = findAll()
    let nuevoId = autos.length + 1;

    //creo el nuevo auto y construyo nuevo array
    let nuevoProducto = {
      id: nuevoId,
      mark: req.body.mark,
      model: req.body.model ,
      price: req.body.price ,
      color: req.body.color 
    }

    let newCars = [nuevoProducto, ...autos]

    //agregarlo al json 
    writeJson(newCars);

    res.redirect("/product/list")

  },
  edit: function( req, res){
    let autos = findAll()

    //buscar el auto que vamos a editar
    let autoFound = autos.find(auto=>{
      return auto.id == req.params.id
    })

    //devolver vista con informacion del auto
    res.render("product-edit-form", {auto:autoFound})
  },
  update: function(req, res){
    //obtengo mis autos
    let autos = findAll()

    //actualizar informacion
    let autosEditados =  autos.map(function(auto){
      if(auto.id == req.params.id){
        auto.mark = req.body.mark
        auto.model = req.body.model
        auto.color = req.body.color
        auto.price = req.body.price
      }
      return auto
    })

    //escribir el json
    writeJson(autosEditados);
    
    res.redirect("/products/list")

  },
  destroy: function(req, res){
    //obtengo los autos
    let autos = findAll()

    //filtramos los autos

    let autosActualizados = autos.filter(function(auto){
      return auto.id != req.params.id
    })
    
    writeJson(autosActualizados);

    res.redirect("/products/list")
  }
  
}

module.exports = productController;