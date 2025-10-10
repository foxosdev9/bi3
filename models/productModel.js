const mongoose = require('mongoose');
const validator = require('validator');


const prodSchema = new mongoose.Schema({
     title: String,
     photo: String,
     userID: String,
     description: String,
     categories: String,
     price: Number
});

const productModel = mongoose.model('Product', prodSchema);


module.exports = productModel;

//learning SCHEMA

// const prodSchema = new mongoose.Schema({
//     name: { 
//         type: String,
//         unique: true,
//         required: true,
//         minLength: [4, 'Name must be a less than 20 caracteres'],
//         // validate: [validator.isAlpha, 'Please name should not contain number']
//     },
//     slug: String,
//     price: Number,
//     categories: {
//         type: String,
//         enum: {
//             values: ['fasion', 'car', 'sex', 'phones'],
//             message: 'Please choose available catgories : FASION/CAR/SEX/PHONES'
//         }
//     },
//     stock: Number,
//     description: String,
//     secureProduct: { type: Boolean, default: false},
//     productPhoto:{
//         type: String,
//         default: 'https://img.freepik.com/free-photo/view-mysterious-cardboard-box_23-2149603196.jpg'
//     },
//     createdAt: { type: Date, default: Date.now(), select: false},
//     keysWord: [String]
// },{ 
//    toJSON: { virtuals: true},
//    toObject: { virtuals: true}
// });

// prodSchema.pre('save', function(next){
//     this.slug = this.name.split(' ').join('').toLowerCase();
//     this.secureProduct = this.name === 'admin' ? true : null;
//     next();
// });

// prodSchema.pre(/^find/, function(next){
//     this.find({ secureProduct: { $ne: true}});
//     next();
// });

// prodSchema.pre('aggregate', function(next){
//     this.pipeline().unshift( { $match: { secureProduct: {$ne: true}}});
//     //pipeline howa khat anabib li 7addna f had agregate pipline() method return arr of our pipline
//     // console.log(this.pipeline)
//     next();
// })

// prodSchema.post('save', function(doc, next){
//     // console.log('HIIII WE FINECHED', doc);
//     next();
// })

// prodSchema.virtual('username').get(function(){
//     return this.name + Date.now();
// });




//VALIDATION
// GAL JONAS BLI SIR F BACKEND HOWA MANKHALIWCH DATA LI KATJI MN USER TSAJEL NICHAN F DB
// KHASNA NT7A9O MANHA O NDIRO LIHA 3AMALIYAT TATHIIR
// REQUIRED: HADA BUILD IN VALIDATOR
// UNIQUE / MACHI VALIDATOR FIH AKHTA2
// maxLength: [ 40, 'error message'] : hada validator build in kaikhdem m3a string
// findByIdAndUpdate({ runValidators: false}) // maghadich ykhdem validator ila badlti name khas had property t3tiha true ila bghiti ykhdem
// kaina method akhra bach tkteb build in validator enum: { values: [], message: ''} :: enum work just with STRING
// min and max work with NUMBER / DATES : not string

/**
 * CUSTOM VALIDATION
 * HOMA VALIDATOR KAN7THOM HNA F SCHEMA
 * validate: {
 *    validator: function(val){}, // this keyword katkhdem gha fash kansjlo new document
 *     message: 'ERROR MESSAGE'
 * }
 * or 
 * validate: [function, 'error message']
 * ist3mel maktaba validator.js
 */