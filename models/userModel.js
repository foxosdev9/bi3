const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const $schema = {
    name: { type: String, required: true},
    email: { 
        type: String,
        required: true, 
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, 'Please provide email']
    },
    photo:{type: String, default: './unckown.jpg'},
    role: {
        type: String,
        enum: ['user', 'admin', 'lead--guide', 'guide'],
        default: 'user'
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
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}

const userSchema = new mongoose.Schema($schema);

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('/^find/', function(next) {
    this.find({active: {$ne: false}});
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        // DateToken, DateChanged in seconds :
        // -- if dateChanged > dateToken => changed
        return JWTTimestamp < changedTimestamp;
    }
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const userModel = mongoose.model('Client', userSchema);

module.exports = userModel;

