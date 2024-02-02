const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config')

const configSchema = new mongoose.Schema({
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

configSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(SALT);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})



module.exports = mongoose.model('Config', configSchema);