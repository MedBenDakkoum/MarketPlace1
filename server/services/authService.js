const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
const Store = require('../models/Store');

async function registerUser(userData) {
    try{
        let { name, email, gender, phoneNumber, password, repeatPassword, isSeller, storeName,categories, line1 ,line2, zipcode, city, country, state } = userData;
        let errors = [];
        let checkUser = await User.findOne({ email });
        if (checkUser) errors.push('This email address is already in use; ');
        if(isSeller){
            if (storeName.length ==0) errors.push('Store Name is Required');
            if (categories.length ==0) errors.push('At least one categorie is Required');
        }
        if (line1.length ==0) errors.push('Address Line 1 is Required');
        //city, country, state
        if (zipcode.length ==0) errors.push('Zip Code is Required');
        if (country.length ==0) errors.push('Country is Required');
        if (state.length ==0) errors.push('Country is Required');

        if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; " );
        if (password !== repeatPassword) errors.push("Passwords should match; " );
        if (password.length < 8) errors.push("Password should be at least 8 characters long; " );
        if (password.length > 20) errors.push("Password should be at max 20 characters long; " );
        if (errors.length >= 1) throw {message: [errors]}
        let newData = {};
        if(isSeller){
            let store = new Store({"title":storeName,"categories":categories});
            console.log(store);
            let storeId = await store.save();
            newData = {
                "name":name,
                "email":email,
                "password":password,
                "phoneNumber":phoneNumber,
                "gender":gender,
                "isSeller":true,
                "idStore": storeId._id,
                "address":{
                    "line1": line1,
                    "line2": line2,
                    "zipCode": zipcode,
                    "city": city,
                    "country":country,
                    "state":state
                }
            }
        }else{
            newData = {
                "name":name,
                "email":email,
                "password":password,
                "phoneNumber":phoneNumber,
                "gender":gender,
                "isSeller":false,
                "address":{
                    "line1": line1,
                    "line2": line2,
                    "zipCode": zipcode,
                    "city": city,
                    "country":country,
                    "state":state
                }
            }
        }
        let user = new User(newData);
        return await user.save();
    }catch(err){
        console.error(err);
        return "error";
    }
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
        token = jwt.sign({ _id: user._id, email: user.email, phoneNumber: user.phoneNumber, avatar: user.avatar ,isSeller:user.isSeller}, SECRET);
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