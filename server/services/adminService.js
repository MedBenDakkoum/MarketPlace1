const User = require('../models/User');
const Store = require('../models/Store')
const Admin = require('../models/Admin');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');

async function getStoreNameById(id){
    let store = await Store.find({"_id":id}).select('title -_id');
    return store[0].title;
}
async function getSellerStoreById(id){
    let seller = await User.find({"_id":id});
    return seller[0].idStore;
}
async function getStoreById(id){
    let store = await Store.find({"_id":id});
    return store[0];
}
async function getSellers() {
    var sellers = await User.find({"isSeller":true}).select("-password");
    for (let i=0;i<sellers.length;i++){
        sellers[i] = sellers[i].toJSON();
        let store = await getStoreNameById(sellers[i].idStore);
        sellers[i]["storeName"] = store;
    }
    return sellers;
}
async function getSellerById(id) {
    var seller = await User.find({"_id":id,"isSeller":true}).select("-password");
    let sellerStore = await getStoreById(seller[0].idStore);
    seller[0] = seller[0].toJSON();
    seller[0].store = sellerStore;
    return seller[0];
}
async function updateSeller(id,data){
    try{
        let sellerData = {...data.seller} || {}
        let storeData = {...data.store} || {}
        let storeID = await getSellerStoreById(id);
        let rslt1 = await Store.findOneAndUpdate({"_id":storeID},storeData);
        let rslt2 = await User.findOneAndUpdate({"_id":id,"isSeller":true},sellerData);
        return {rslt1,rslt2}
    }catch(err){
        console.error(err);
    }
}
async function getAdmin(id) {
    try{
        let a = await Admin.findById(id);
        if(a){
            return a;
        }else{
            throw { statusCode: 404, message: 'No user with this id found'}
        }
    }catch{
        throw { statusCode: 404, message: 'No user with this id found'}
    }
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
module.exports = {
    getSellers,
    getAdmin,
    getSellerById,
    updateSeller,
    uploadImage
}