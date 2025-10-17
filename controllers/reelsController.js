const catchAsync = require('../utils/catchAsync');
const Reels = require('../models/reelsModel');

exports.getAllReels = catchAsync(async function(req, res, next){
    const reels = await Reels.find();
    res.status(201).json({
        status: 'success',
        data: {
            reels
        }
    });
});

exports.addNewReel = catchAsync(async(req, res, next) => {
    const newReel = await Reels.create({
        title: req.body.title,
        videoLink: req.reelURL,
        category: 'public',
        userID: req.user._id
    });

    res.status(201).json({
        status: 'success',
        data: {
            newReel
        }
    })
})