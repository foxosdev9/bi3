const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController');
const cloud = require('../controllers/cloudinary');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./public/photos");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

// const upload = multer({ dest: 'public/photos'})
router
  .route('/')
  .get(productController.getAllProducts)
  .post(upload.single('productPhoto'), productController.createNewProduct);

module.exports = router;