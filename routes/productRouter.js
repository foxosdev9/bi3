const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../utils/upload-multer');
const authController = require('../controllers/authController');


router.route('/top-3-girls')
.get(productController.aliasTopGirls, productController.getAllProducts);

router.route('/stats')
      .get(productController.getStaticProduct);

router.route('/plan/:key').get(productController.getKeywordSearch);


router
  .route('/')
  .get(authController.protect, productController.getAllProducts)
  .post(authController.protect,upload.single('photo'), productController.createNewProduct);



router
   .route('/:id')
   .patch(productController.upDateProduct)
   .get(productController.getOneProduct)
   .delete(authController.protect, productController.deleteOneProduct);

module.exports = router;