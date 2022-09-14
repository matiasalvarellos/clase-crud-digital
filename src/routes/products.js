const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const validator = require("../middlewares/express-validator.js");
const multerConfig = require("../middlewares/multer/multerProducts");


router.get("/list", productController.list );
router.get("/detail/:id", productController.detail );

//rutas de creación
router.get("/create", productController.create );
router.post("/create", multerConfig.array("images"), validator.form, productController.store );

//rutas de edición
router.get("/edit/:id", productController.edit );
router.put("/edit/:id", validator.form, productController.update );
 
//ruta de borrado
router.delete("/delete/:id", validator.form, productController.destroy );

//ruta para buscador
router.get("/search", productController.search);

router.post("/api/create", multerConfig.single("images") , productController.apiCreate);

module.exports = router