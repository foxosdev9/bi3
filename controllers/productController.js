const qs = require('qs');
const APIFeatures = require('../utils/apiFeatures');
const Product = require('../models/productModel');
const cloudinary = require('../utils/cloudinary');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');



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


exports.createNewProduct = catchAsync(async (req, res, next) => {
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
             keysWord: []
         });

         res.status(201).json({
             status: 'success',
             data: {
                 newProduct
             }
         })
})

exports.getAllProducts = catchAsync(async(req, res, next) => {
        console.log(req.user);
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

})

    
exports.getOneProduct = catchAsync(async (req, res, next) => {
    
       const { id } = req.params;
    //    if(!mongoose.Types.ObjectId.isValid(id)){
    //      return next(new AppError('Invalid ID format', 400))
    //    }
       const findProduct = await Product.findById(id);
       
       if(!findProduct){
        return next(new AppError('No found Product on this ID', 404));
       }
       res.status(200).json({
        status: 'success',
        data: {
            product: findProduct
        }
       })

})

exports.upDateProduct = catchAsync(async (req, res, next) => {
    
       const { id } = req.params;
       const upDatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true});
       
       res.status(200).json({
        status: 'success',
        data: {
            product: upDatedProduct
        }
       })
})


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