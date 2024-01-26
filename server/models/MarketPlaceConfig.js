const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config')

const adminSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    status: {
        type:Boolean,
        default: true
    },
    isAdmin: {
        type:Boolean,
        default: true
    },
    name: {
        type: String,
        trim: true,
        required: 'Please fill a name. It can be your real one or a username.'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: ['Password is required'],
        minlength: [8, 'Password should be at least 8 characters long']
    }
});

module.exports = mongoose.model('Admin', adminSchema);