const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../utils/upload-multer');


router.route('/top-3-girls')
.get(productController.aliasTopGirls, productController.getAllProducts);

router.route('/stats')
      .get(productController.getStaticProduct);

router.route('/plan/:key').get(productController.getKeywordSearch);


router
  .route('/')
  .get(productController.getAllProducts)
  .post(upload.single('productPhoto'), productController.createNewProduct);



router
   .route('/:id')
   .patch(productController.upDateProduct)
   .get(productController.getOneProduct)

module.exports = router;