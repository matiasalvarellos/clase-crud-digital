const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/images/avatars"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  }
});

const upload = multer({ 
  storage: storage, 
  fileFilter: (req, file, cb)=>{
    let acceptExtname = [".jpg", ".jpeg", ".png",".JPG", ".JPEG", ".PNG"];
    let extname = path.extname(file.originalname);
    let resultado = acceptExtname.includes(extname);
    if(!resultado){
      req.file = file
    }
    cb(null, resultado);
  } 
});

module.exports = upload;
