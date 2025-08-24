const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    name: String,
    slug: String,
    price: Number,
    categories: String,
    stock: Number,
    description: String,
    secureProduct: { type: Boolean, default: false},
    productPhoto:{
        type: String,
        default: 'https://img.freepik.com/free-photo/view-mysterious-cardboard-box_23-2149603196.jpg'
    },
    createdAt: { type: Date, default: Date.now(), select: false},
    keysWord: [String]
},{ 
   toJSON: { virtuals: true},
   toObject: { virtuals: true}
});

prodSchema.pre('save', function(next){
    this.slug = this.name.split(' ').join('').toLowerCase();
    this.secureProduct = this.name === 'admin' ? true : null;
    next();
});

prodSchema.pre(/^find/, function(next){
    this.find({ secureProduct: { $ne: true}});
    next();
})

prodSchema.post('save', function(doc, next){
    // console.log('HIIII WE FINECHED', doc);
    next();
})

prodSchema.virtual('username').get(function(){
    return this.name + Date.now();
});

const productModel = mongoose.model('Product', prodSchema);

module.exports = productModel;