const Product = require('../models/Product');
const Store = require("../models/Store")
const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');

async function getProducts(storeId) {
    try{
        let prods = [];
        let store = Store.find({_id:storeId});
        if(store.isPublic){
            store.products.forEach(function(p){
                prods.push(Product.findOne({_id: p}).exec());
            })
        }else{
            return [];
        }
    }catch(err){
        throw err;
    }
}
async function getInfo(){

}
async function getStoreById(storeId) {
    return await Store.findById(storeId);
}
async function updateStore(id,data){
    try{
        console.log(data);
        let rslt = await Store.findOneAndUpdate({"_id":id},data);
        return rslt
    }catch(err){
        console.error(err);
    }
}
// async function findByCategory(category) {
//     return await Product.find({ category: category })
// }

// async function findById(id) {
//     return await Product.findById(id);
// }

// async function edit(id, data) {
//     return await Product.updateOne({ _id: id }, data);
// }

// async function create(data, userId) {
//     let product = new Product({...data})
//     await product.save();

//     return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
// }

// async function uploadImage(image) {
//     const uploadResponse = await cloudinary.uploader.upload(image, {
//         upload_preset: CLOUDINARY_STORAGE,
//     }, { quality: "auto" });

//     let imageUrl = uploadResponse.url;
//     let index = (imageUrl.indexOf('upload/')) + 6;

//     let compressedImg = imageUrl
//         .substring(0, index) +
//         "/c_fit,q_auto,f_auto,w_800" +
//         imageUrl.substring(index);

//     return compressedImg;
// }

// async function userCollectionUpdate(userId, product) {
//     return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
// }

// async function findUserById(id) {
//     return await User.findById(id);
// }

module.exports = {
    getProducts,
    getStoreById,
    updateStore
}
