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
async function getProds(sellerId){
    try{
        return new Promise(async (resolve, reject) => {
            let products =  new Promise(async (resolve2, reject) => {
                resolve2(await Product.find({seller:sellerId}))
            })
            var getingProds = new Promise((resolve1, reject) => {
                products.then((p)=>{
                    let prods = [...p] 
                    let newProds = []
                    let i=0;
                    prods.forEach(async (p) => {
                        await initialProduct.findOne({_id: p.initialProduct}).then((e)=>{
                            newProds.push({product:p,initialProd:e});
                        })
                        if(i==prods.length-1){
                            resolve1(newProds)
                        }
                        i++;
                    })
                })
            });
            getingProds.then((NP)=>{
                resolve(NP);
            })
        })
    }catch(err){
        console.error(err);
    }
}

async function getInitProds(cats){
    try{
        return new Promise(async (resolve, reject) => {
            const products = async (cat) =>{  
                return new Promise(async (resolve2, reject) => {
                    let ip = await initialProduct.find({"category":cat})
                    resolve2(ip)
                })
            }
            const getingProds = new Promise((resolve1, reject) => {
                let newProds =[]
                i=0
                cats.forEach(function(singleCat){
                    products(singleCat).then((ips)=>{
                        if(ips.length>0){
                            newProds = [...newProds,...ips];
                        }
                        if(i==cats.length-1){
                            resolve1(newProds);
                        }
                        i++
                    });
                        
                })
            });
            getingProds.then((NP)=>{
                resolve(NP);
            })
        })
    }catch(err){
        console.error(err);
    }
}

async function getInitProdById(id){
    return await initialProduct.findById(id);
}
async function getProductPrice(pid){
    try{
        return new Promise(async (resolve, reject) => {
            let product =  new Promise(async (resolve2, reject) => {
                resolve2(await Product.findById({_id:pid}))
            })
            product.then(function(p){
                resolve({
                    "initialPrice":p.price,
                    "price":p.newPrice,
                    "priceAddType":p.priceAddType || "percentage",
                    "priceAddAmount":p.priceAddAmount || 0,
                })
            })
        })
    }catch(err){
        console.error(err);
    }
}
const calculate = (t,p,a)=>{
    if(isNaN(a)){
        a=0;
    }
    switch(t){
        case "percentage":
            return p+((p*a)/100);
            break;
        case "fixed":
            return p+a;
            break;
        default:
            break;
    }
}
async function changeProductPrice(pid,data){
    try{
        return new Promise(async (resolve, reject) => {
            let changeProduct =  new Promise(async (resolve2, reject) => {
                resolve2(
                    await Product.findOneAndUpdate(
                    {
                        _id:pid
                    },{
                        priceAddType:data.priceAddType,
                        priceAddAmount:data.priceAddAmount,
                        newPrice:calculate(data.priceAddType,parseInt(data.initPrice),parseInt(data.priceAddAmount)),
                        earning:calculate(data.priceAddType,parseInt(data.initPrice),parseInt(data.priceAddAmount))-parseInt(data.initPrice)
                    }))
            })
            changeProduct.then(function(p){
                resolve(p)
            })
        })
    }catch(err){
        console.error(err);
    }
}
async function getProductImages(pid){
    try{
        return new Promise(async (resolve, reject) => {
            let Imgs =  new Promise(async (resolve1, reject) => {
                let iP = await Product.findById(pid,{initialProduct:1,images:1});
                resolve1([await initialProduct.findById(iP.initialProduct,{images:1}),iP]);
            })
            Imgs.then(function(rslt){
                resolve({initImages:rslt[0].images,prodImages:rslt[1].images})
            })
        })
    }catch(err){
        console.error(err);
    }
}
async function updateProductImages(pid,data){
    try{
        return new Promise(async (resolve, reject) => {
            resolve(await Product.findOneAndUpdate({_id:pid},data))
        })
    }catch(err){
        console.error(err);
    }
}
async function getProductSeo(pid){
    try{
        return new Promise(async (resolve, reject) => {
            resolve(await Product.findById(pid,{"seo":1}))
        })
    }catch(err){
        console.error(err);
    }
}
async function updateProductSeo(pid,data){
    try{
        return new Promise(async (resolve, reject) => {
            resolve(await Product.findOneAndUpdate({_id:pid},{seo:data}))
        })
    }catch(err){
        console.error(err);
    }
}
async function toggleActive(pid){
    try{
        return new Promise(async (resolve, reject) => {
            let p = await Product.findById(pid,{"isActive":1});
            resolve(await Product.findOneAndUpdate({_id:pid},{"isActive":!p.isActive}))
        })
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
    updatePassword,
    getProds,
    getInitProdById,
    getProductPrice,
    changeProductPrice,
    getProductImages,
    updateProductImages,
    getProductSeo,
    updateProductSeo,
    toggleActive,
    getInitProds
}