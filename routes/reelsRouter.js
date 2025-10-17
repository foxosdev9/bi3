const express = require('express');

const router = express.Router();

const reelsController = require('../controllers/reelsController');
const authController = require('../controllers/authController');

// import { upload, uploadToCloudinary } from "../utils/upload-reels.js";
const {upload , uploadToCloudinary} = require('../utils/upload-reels')

router
.route('/')
.get(reelsController.getAllReels)
.post(authController.protect, upload.single('video'), async (req, res, next) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer);
    req.reelURL = result.secure_url;
    // res.json({ url: result.secure_url });
    next();
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
}, reelsController.addNewReel)



module.exports = router;