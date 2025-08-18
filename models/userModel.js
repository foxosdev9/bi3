const mongoose = require('mongoose');

const $schema = {
    fullName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    gender: String,
    password: String,
    passwordConfirm: String
}

const userSchema = new mongoose.Schema($schema);


const userModel = mongoose.model('Client', userSchema);

module.exports = userModel;

