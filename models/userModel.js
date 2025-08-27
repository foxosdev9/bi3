const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const $schema = {
    name: { type: String, required: true},
    email: { 
        type: String,
        required: true, 
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, 'Please provide email']
    },
    gender: String,
    photo: String,
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength:8,
        select: false
    },
    passwordConfirm: {
        type:String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Password are not the same'
        }
    }
}

const userSchema = new mongoose.Schema($schema);

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}
const userModel = mongoose.model('Client', userSchema);

module.exports = userModel;

