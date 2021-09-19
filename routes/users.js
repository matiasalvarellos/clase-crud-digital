const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");
const guestMiddle = require("../middlewares/guest-middleware");
const validator = require("../middlewares/express-validator");
const multerConfig = require("../middlewares/multer/multer-avatars");

//login
router.get('/login', guestMiddle, usersController.login);
router.post('/login', validator.login, usersController.processLogin);

//register
router.get("/register", usersController.register);
router.post("/register", multerConfig.single("avatar"), usersController.processRegister);

router.post("/logout", usersController.logout);

module.exports = router;
