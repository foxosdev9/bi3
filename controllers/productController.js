const cloud = require('./cloudinary');
const qs = require('qs');
const Product = require('../models/productModel');

exports.createNewProduct = async (req, res) => {
    try{
        let image;
        if(req.file){
          await cloud.uploader
           .upload(req.file.path, { folder: 'my_uploads'})
           .then(result => {
                image = result.secure_url
                // req.newUrlPhoto = result.secure_url;
        })}   
        const newProduct = await Product.create({
            name: req.body.name,
            price: +req.body.price,
            description: req.body.description,
            categories: req.body.categories,
            stock: req.body.stock,
            productPhoto: image,
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
        
        const queryObj = { ...qrs};
        
        const exludsFields = ['page', 'limit','fields','sort'];
        exludsFields.forEach(el => delete queryObj[el]);
      
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

        

        const query = Product.find(JSON.parse(queryStr));

        const products = await query;

        //console.log(Product.find(queryObj));
        

        res.status(201).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        })

    }catch(err){
        console.log(err);
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
