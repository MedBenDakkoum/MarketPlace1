const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    // userId: { type: Number, unique: true },
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
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: ['Phone number is required']
    },
    gender: {
        type: String,
        trim: true,
        default: 'Not specified'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/silenceiv/image/upload/q_auto:eco/v1617358367/defaultAvatar_wnoogh.png'
    },
    isSeller: {
        type:Boolean,
        default: false
    },
    idStore: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    },
    address: {
        line1: {type:String, required:true},
        line2: {type:String, default: ""},
        zipCode: {type:String, required:true},
        city: {type:String,required:true},
        country: {type:String, default: "Tunisia"},
        state: {type:String, default: "",required:true}
    },
    balance: {
        type: Number,
        default:0
    },
    paymentMethod: {
        method:{type:String,default:""},
        details:{type:String,default:""}
    },
    subscription: {
        //change is Active to false
        isSubscribed:{type:Boolean,default:true},
        fee:{type:Number},
        startDate:{type:Date},
        endDate:{type:Date},
    },
    isActive:{
        type:Boolean,
        default:true
    },
    banner:{
        type:String
    },
    socials:{
        facebook:{type:String,default:""},
        twitter:{type:String,default:""},
        youtube:{type:String,default:""},
        instagram:{type:String,default:""}
    }
},{timestamps:true});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(SALT);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash; 
    next();
})



module.exports = mongoose.model('User', userSchema);