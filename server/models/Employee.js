const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    isActive:{
        type:Boolean
    }
},{timestamps:true});

employeeSchema.plugin(AutoIncrement, { inc_field: 'employeeId' });

employeeSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(SALT);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash; 
    next();
})

module.exports = mongoose.model("Employee", employeeSchema);