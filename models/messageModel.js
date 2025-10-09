const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
   time: { type: Date, required: true},
   message: { type: String, required: [true, " you can't send empty message"]},
   userName: {type: String, required: true},
   userPhoto: String,
   userID: String
});


const msgModel = mongoose.model('Message', msgSchema);

module.exports = msgModel;
