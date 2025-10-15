const Client = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');


const filterObj = (object, ...fields) => {
    const newBodyObj = {};

    Object.keys(object).forEach(el => {
        if(fields.includes(el)) newBodyObj[el] = object[el]
    });
    return newBodyObj;
}

exports.getAllUsers = async (req, res) => {
   try{
      const clients = await Client.find();
      res.status(200).json({
        status: 'success',
        results: clients.length,
        data: {
            clients
        }
      });
   }catch(err){
    console.log(err)
   }
}

exports.getUser = catchAsync(async (req, res, next) => {
    const client = await Client.findById(req.params.id);
    if(!client){
        return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            client
        }
    })
});

exports.createUser = catchAsync(async (req, res) => {
    try{
       const { name, email, password,passwordConfirm , gender } = req.body;
       
       const newClient = await Client.create({
        name, email, gender, password, passwordConfirm
       });

        // await newClient.save();

        res.status(200).json({
            status: 'success',
            data: {
                data: newClient
            }
        })

    }catch(err){
        console.log(err.message);
    }
})


exports.updateUser = async (req, res) => {
    try{
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                client
            }
        })
    }catch(err){
        console.log(err.message);
    }
}

exports.deleteUser = async (req, res) => {
    try{
        await Client.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    }catch(err){
        console.log(err.message);
    }
}

exports.upDateMe = catchAsync(async (req, res, next) => {
    

     if(req.body.password || req.body.passwordConfirm){
         return next(new AppError('This route not for update Password', 400))
     };
    
    if(req.file){
        await cloudinary.uploader
        .upload(req.file.path, { folder: 'my_uploads'})
        .then(result => {
            image = result.secure_url
            req.newUrlPhoto = result.secure_url;
        })} 
    
    const filterBody = filterObj({...req.body, photo: req.newUrlPhoto || undefined}, 'name', 'email', 'photo', 'bio');
    

    const newUser = await Client.findByIdAndUpdate(req.user._id, filterBody, {new: true, runValidators: true});
    
    res.status(200).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await Client.findByIdAndUpdate(req.user._id, {active: false});
    res.status(204).json({
        status: 'success',
        data: null
    });
});


exports.getMe = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};

exports.deletePhoto = async (req, res, next) => {
    try{
       const user = await Client.findByIdAndUpdate(req.user._id, {photo: ''}, {new: true});
       res.status(203).json({ status: 'sucess', data: user});
    }catch(err){
       res.status(401).json({status: 'fail', message: err.message});
    }
}


// exports.upDateStatusAccount = catchAsync(async function(req, res, next){
//     const { id } = req.params;
//     const user = find
// })