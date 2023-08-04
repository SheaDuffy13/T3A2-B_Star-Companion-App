const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary').v2;
const { Image } = require('../models/Planet');

// Multer config
// const storage = multer.memoryStorage();
// const fileFilter = (req, file, cb) => {
//   let ext = path.extname(file.originalname);
//   if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//     cb(new Error('Unsupported file type!'), false);
//     return;
//   }
//   cb(null, true);
// };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

exports.upload = multer({ storage });