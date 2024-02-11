const User = require('../models/User');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const initialProduct = require('../models/initialProduct');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');
const { SALT } = require('../config/config');

async function edit(userId, userData) {
    return await User.updateOne({ _id: userId }, { $set: { ...userData } });
}

async function getUserById(userId) {
    return await User.findById(userId).populate("createdSells").lean();
}

async function getSellerById(sellerId) {
    return await User.findById(sellerId).select("-password");
}
async function getDashboardHome(sellerId) {
    let orderCount = {
        Pending: 0,
        Completed: 0,
        Processing: 0,
        Cancelled: 0,
        Refunded: 0,
    }
    let productCount = {
        Live: 0,
        Offline: 0,
        Pending: 0,
    }
    let orders = await Order.find({sellerId:sellerId});
    let products = await Product.find({seller:sellerId});
    let t =0;
    let sales = 0;
    let earnings = 0;
    orders.forEach(async (element) => {
        t++;
        sales=sales+element.totalPrice;
        earnings=earnings+element.sellerEarnings;
        switch(element.status){
            case "Pending":
                orderCount.Pending++;
                break;
            case "Completed":
                orderCount.Completed++;
                break;
            case "Processing":
                orderCount.Processing++;
                break;
            case "Cancelled":
                orderCount.Cancelled++;
                break;
            case "Refunded":
                orderCount.Refunded++;
                break;
            default:
                break;
        }
    });
    orderCount.Total=t;
    let pt=0;
    products.forEach(async (element) => {
        pt++;
        switch(element.status){
            case "Pending":
                productCount.Pending++;
                break;
            case "Live":
                productCount.Live++;
                break;
            case "Offline":
                productCount.Offline++;
                break;
            default:
                break;
        }
    });
    productCount.Total=pt;
    return {orders:orderCount,products:productCount,info:{earnings:earnings,sales:sales}};
}

async function uploadImage(image) {
    try{
        const uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: CLOUDINARY_STORAGE,
        }, { quality: "auto" });

        let imageUrl = uploadResponse.url;
        let index = (imageUrl.indexOf('upload/')) + 6;

        let compressedImg = imageUrl
            .substring(0, index) +
            "/c_fit,q_auto,f_auto,w_800" +
            imageUrl.substring(index);

        return compressedImg;
    }catch(err){
        console.log(err);
    }
}

async function updateProfile(id,data){
    try{
        let rslt = await User.findOneAndUpdate({"_id":id},data);
        return rslt
    }catch(err){
        console.error(err);
    }
}

async function updatePassword(id,data){
    try{
        let user = await User.findOne({ "_id":id });
        let currentIsValid;
        if(user){
            currentIsValid = await bcrypt.compare(data.currentPass,user.password);
        }
        let reTypeIsValid = data.newPass == data.reNewPass;
        if(currentIsValid){
            if(reTypeIsValid){
                let salt = await bcrypt.genSalt(SALT);
                let hash = await bcrypt.hash(data.newPass, salt);
                return await User.findOneAndUpdate({"_id":id,"isSeller":true},{password:hash});
            }
            else{
                return {status:"fail",message:"The new password and the repeat of it are not identical."};
            }
        }else{
            return {status:"fail",message:"The current password is incorrect."};
        }
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    edit,
    getUserById,
    getSellerById,
    getDashboardHome,
    uploadImage,
    updateProfile,
    updatePassword
}