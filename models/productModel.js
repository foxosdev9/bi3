const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    categories: String,
    stock: Number,
    description: String,
    productPhoto:{
        type: String,
        default: 'https://img.freepik.com/free-photo/view-mysterious-cardboard-box_23-2149603196.jpg'
    }
});

const productModel = mongoose.model('Product', prodSchema);

module.exports = productModel;