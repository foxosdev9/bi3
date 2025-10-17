const mongoose = require('mongoose');

const reelsSchema = new mongoose.Schema({
  title: {type: String, maxLength: 23},
  videoLink: { type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  userID: {type: String, required: true},
  category: String
});

const reelsModel = mongoose.model('Reels', reelsSchema);


module.exports = reelsModel;