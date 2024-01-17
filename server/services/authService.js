const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

async function registerUser(userData) {
    let { name, email, gender, phoneNumber, password, repeatPassword } = userData;
    let errors = [];
    let checkUser = await User.findOne({ email });
    if (checkUser) errors.push('This email address is already in use; ');
    if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
    if (/(\+)?(359|0)8[789]\d{1}(|-| )\d{3}(|-| )\d{3}/.test(phoneNumber) == false) errors.push('Phone number should be a valid BG number; ' );
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; " );
    if (password !== repeatPassword) errors.push("Passwords should match; " );
    if (password.length < 8) errors.push("Password should be at least 8 characters long; " );
    if (password.length > 20) errors.push("Password should be at max 20 characters long; " );
    if (errors.length >= 1) throw {message: [errors]}
    
    let user = new User(userData);
    return await user.save();
}

async function loginUser({ email, password }) {
    
    let user = await User.findOne({ email });
    let admin = await Admin.findOne({ email });

    if (!user && !admin) throw { message: 'Invalid email or password' };
    let hasValidPass,isValidAdmin;
    if(user){
        hasValidPass = await bcrypt.compare(password, user.password);
    }else{
        isValidAdmin = await bcrypt.compare(password, admin.password);
    }
    if (!hasValidPass && ! isValidAdmin) throw { message: "Invalid email or password" }
    let token;
    if(hasValidPass){
        token = jwt.sign({ _id: user._id, email: user.email, phoneNumber: user.phoneNumber, createdSells: user.createdSells.length, avatar: user.avatar }, SECRET);
    }else{
        token = jwt.sign({_id: admin._id, email : admin.email, isAdmin: admin.isAdmin}, SECRET);
    }
    console.log("token: "+token);
    return token;
}

async function getUser(id) {
    try{
        let u = await User.findById(id).lean();
        if(u){
            return u;
        }else{
            return await Admin.findById(id).lean();
        }
    }catch{
        throw { statusCode: 404, message: 'No user with this id found'}
    }
} 

module.exports = {
    registerUser,
    loginUser,
    getUser
}