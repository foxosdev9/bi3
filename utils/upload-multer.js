 const cloudinary = require('./cloudinary');
 const { CloudinaryStorage } = require('multer-storage-cloudinary');
 const multer = require('multer');

 const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
         folder: 'my-photos'
     }
 });
 

 const parser = multer({ storage })

 module.exports = parser;



// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,"./public/photos");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// });

// const upload = multer({ storage });

// // const upload = multer({ dest: 'public/photos'})