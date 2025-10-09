const catchAsync = require('../utils/catchAsync');
const Message = require('../models/messageModel');

exports.getAllMessage = catchAsync(async (req, res, next) => {
    const messages = await Message.find();
    res.status(201).json({
        status: 'success',
        results: messages.length,
        messages: {
            messages
        }
    })
})

exports.createMessage = catchAsync(async (req, res) => {
    
   
    const msg = await Message.create({
        time: Date.now(),
        message: req.body.message,
        userName: req.body.userName,
        userPhoto: req.body.userPhoto,
        userID: req.body.userID
    });
    // await msg.save(); not use with create method

    res.status(200).json({
        status: "success",
        message: {
            msg
        }
    })

    
});