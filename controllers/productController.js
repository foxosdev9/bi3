const qs = require('qs');
const APIFeatures = require('../utils/apiFeatures');
const Product = require('../models/productModel');
const cloudinary = require('../utils/cloudinary');


exports.aliasTopGirls = (req, res, next) => {
    //   req.query.limit = '3';
    //   req.query.fields = 'name,price,description';
    //   req.query.sort = 'price';
    req.queryOverrides = {
     limit: '3',
     sort: 'price',
     fields: 'name,price,description',
   };
   
  
    next();

}

exports.createNewProduct = async (req, res) => {
    try{
         
         let image;
        if(req.file){
           await cloudinary.uploader
            .upload(req.file.path, { folder: 'my_uploads'})
            .then(result => {
                 image = result.secure_url
                  req.newUrlPhoto = result.secure_url;
         })} 

         const newProduct = await Product.create({
             name: req.body.name,
             price: +req.body.price,
             description: req.body.description,
             categories: req.body.categories,
             stock: +req.body.stock,
             productPhoto: image,
             keysWord: req.body.keysWord.split(' ')
         });
         res.status(201).json({
             status: 'success',
             data: {
                 newProduct
             }
         })
    }catch(err){
        console.log(err.message);
    }
}

exports.getAllProducts = async(req, res) => {
    try{
        const qrs = qs.parse(req._parsedUrl.query);
        const queryInput = { ...qrs, ...req.queryOverrides || {}};


        const features = new APIFeatures(Product.find(), queryInput)
             .filter()
             .sort()
             .limitFields()
             .paginate();
              
        const products = await features.query;

        res.status(201).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        })

    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getOneProduct = async (req, res) => {
    try{
       const { id } = req.params;
       const findProduct = await Product.findById(id);
       res.status(200).json({
        status: 'success',
        data: {
            product: findProduct
        }
       })

    }catch(err){
       res.status(404).json({status: 'fail', message: err.message})
    }
}

exports.upDateProduct = async (req, res) => {
    try{
       const { id } = req.params;
       const upDatedProduct = await Product.findByIdAndUpdate(id, {name: req.body.name}, { new: true});
       res.status(200).json({
        status: 'success',
        data: {
            product: upDatedProduct
        }
       })

    }catch(err){
       res.status(404).json({status: 'fail', message: err.message})
    }
}


exports.getStaticProduct = async (req, res) => {
    try{
        
       const stats = await Product.aggregate([
        {
            $group: {
                _id: { $toUpper: '$categories'},
                avgPrice: { $avg: "$price"},
                totalStock: { $sum: "$stock"},
                minPrice: { $min: '$price'},
                count: { $sum: 1}
            }
        },
        { $sort: { minPrice: -1}},
        { $match: { _id: { $ne: 'FASION'}}}

        //   {
        //     $match: { price: { $gte: 300}, categories: 'sex'},
        //   },
        //   {
        //     $sort: { price: -1}
        //   }
       ]);

       res.status(200).json({
          status: 'success',
          data: {
            stats: stats
          }
       });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}


exports.getKeywordSearch = async (req, res) => {
    try{
        const { key } = req.params;

        const stats = await Product.aggregate([
            {
                $unwind: '$keysWord'
            },
            {
                $match: { keysWord: key }
            },
            {
                $limit: 1
            }
        ])
        res.status(200).json({
          status: 'success',
          results: stats.length,
          data: {
            stats: stats
          }
       });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}