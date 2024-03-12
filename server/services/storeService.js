const Product = require('../models/Product');
const Store = require("../models/Store")
const User = require('../models/User');

// async function getOrders(storeId) {
//     try{
//         return new Promise(async (resolve, reject) => {
//             let orders = await Order.find({products:{
//                 $elemMatch: {storeId:storeId}
//             }});
//             let extractSellerOrders = new Promise(async (resolve1,reject1)=>{
//                 let newOrders = [];
//                 let i=0;
//                 orders.forEach(function(order){
//                     const divising = new Promise(async(resolve2,reject2)=>{
//                         let newProducts = []
//                         let j=0;
//                         order.products.forEach(async function(product){
//                             if(product.storeId.toString()==storeId.toString()){
//                                 newProducts.push(
//                                     {
//                                         productId:product.productId,
//                                         quantity:product.quantity,
//                                         attributes:product.attributes
//                                     }
//                                 );
//                             }
//                             if(j==order.products.length-1){
//                                 let prices = await getTotalPrices(newProducts); 
//                                 resolve2({
//                                     prices: prices,
//                                     products:newProducts
//                                 })
//                             }
//                             j++;
//                         })
//                     })
//                     divising.then(function(data){
//                         newOrders.push({...data,date:order.date,status:order.status,clientId:order.clientId,orderId:order.orderId,paymentMethod:order.paymentMethod || ""});
//                         if(i==orders.length-1){
//                             resolve1(newOrders);
//                         }
//                         i++;
//                     })
                    
//                 })
//             })
//             extractSellerOrders.then(function(rslt){
//                 resolve(rslt);
//             })
//         })
//     }catch(err){
//         throw err;
//     }
// }
async function getPublicInfoByLink(storeLink){
    return await Store.findOne({link:storeLink},{"banner":1,"logo":1,"title":1,"description":1});
}

async function getStoreById(storeId) {
    return await Store.findById(storeId);
}
async function getStoreByProductId(productId) {
    let prod = await Product.findById(productId,{"seller":1});
    let u = await User.findById(prod.seller,{"idStore":1});
    return await Store.findById(u.idStore);
}
async function updateStore(id,data){
    try{
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
    getStoreById,
    updateStore,
    getPublicInfoByLink,
    getStoreByProductId,
}
