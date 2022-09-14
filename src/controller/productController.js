const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const {Car, Color, Image} = require("../database/models");
const Auto = require("../services/Auto");
const db = require("../database/models");
const {Op} = require("sequelize")


const productController = {
  apiCreate: async (req, res)=>{
    
    await Car.create({
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.pricee
    })
    res.json("hola");
  },
  list: async function(req, res){
    
    //obtenemos todos los autos
    let cars = await Car.findAll({include: "images"})
    //devuelvo la respuesta
    res.render("list", { cars } )

  },
  detail: async function(req, res){

    let car = await Car.findByPk(req.params.id)
    //duvuelvo la respuesta
    res.render("detail", {auto: car})

  },
  create: async function(req, res){

    let colors = await Color.findAll();
    //duelvo la respuesta
    res.render("product-create-form", {colors})
  },
  store: async function(req, res){
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const colors = await Color.findAll()
      if(req.files){
        for(let file of req.files){
          fs.unlinkSync(path.join(__dirname, `../../public/images/imgProducts/${file.filename}`))
        }
      }
      return res.render("product-create-form", {
        old: req.body,
        errors: errors.errors,
        colors
      })
    }
    
    let newProduct = await Car.create({
      brand: req.body.mark ,
      model: req.body.model,
      price: req.body.price,
    })
    
    await newProduct.setColors([1, 2, 3]);


    let images = req.files.map(function(image){
      return {
        name: image.filename,
        car_id: newProduct.id 
      }
    })
    
    await Image.bulkCreate(images);

    //devuelvo una respuesta
    return res.redirect("/");
  },
  edit: async function(req, res){
    
    let auto = await Car.findByPk(req.params.id);
    let colors = await Color.findAll();
    
    //devuelvo una respuesta
    res.render("product-edit-form", {auto, colors})
  },
  update: async function(req, res){

    await Car.update({...req.body}, {where: {id:req.params.id}})

    let car = await Car.findByPk(req.params.id);

    await car.setColors(req.body.colors);

    res.redirect("/products/detail/"+req.params.id)

  },
  destroy: async function(req, res){
    
    let images = await Image.findAll({
      where: {
        car_id: req.params.id
      }
    })

    await Car.destroy({
      where:{
        id:req.params.id
      }
    })

    images.forEach((image)=> {
      fs.unlinkSync(path.join(__dirname,`../../public/images/imgProducts/${image.name}`))
    })

    //devuelvo una respuesta
    res.redirect("/products/list");
  },
  search: async (req, res)=>{

    let cars = await Car.findAll({
      where:{
        brand: {[Op.like]: `%${req.query.search}%` }
      }
    })

    res.render("list", {cars})

  }
}

module.exports = productController;