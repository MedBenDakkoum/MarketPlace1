const Product = require('../models/Product');
const initialProduct = require('../models/initialProduct');
const Store = require("../models/Store")
const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');

async function getProducts(storeLink) {
    try{
        return new Promise(async (resolve, reject) => {
            let store = await Store.findOne({link:storeLink});
            if(store){
                if(store.isPublic){
                    let user = await User.findOne({idStore: store._id},{});
                    let products = await Product.find({seller:user._id},{"initialProduct":1,"newPrice":1,"isActive":1})
                    let prods = [...products] 
                    let newProds = []
                    console.log(products);
                    var getingProds = new Promise((resolve1, reject) => {
                        prods.forEach(async (p,i) => {
                            let newP = {...p,img:"",name:"",price:0};
                            if(p.isActive){
                                await initialProduct.findOne({_id: p.initialProduct}).then((e)=>{
                                    newProds.push({img:e.images[0] || "",name:e.name,price:p.newPrice});
                                })
                            }
                            if(i==prods.length-1) resolve1()
                        })
                    });
                    getingProds.then(()=>{
                        resolve(newProds)
                    })
                }else{
                    resolve([{}]);
                }
            }else{
                resolve([{msg:"Not Found"}]);
            }
        })
    }catch(err){
        throw err;
    }
}
async function getInfoByLink(storeLink){
    return await Store.findOne({link:storeLink},{"banner":1,"logo":1,"title":1,"description":1});
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
    updateStore,
    getInfoByLink
}
