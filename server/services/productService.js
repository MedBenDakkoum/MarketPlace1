const Product = require('../models/Product');
const User = require('../models/User');

async function getAll() {
    return await Product.paginate();
}

async function findByCategory(category) {
    return await Product.find({ category: category })
}

async function findById(id) {
    return await Product.findById(id);
}
async function assignProdToSeller(sellerId,data){
    let iP = await initialProduct.findById(data.productId);
    let product=new Product({
        seller:sellerId,
        initialProduct:data.productId,
        ref:iP.ref,
        price:iP.price,
        newPrice:data.price.price,
        earning:data.price.price-iP.price,
        priceAddType:data.price.priceAddType,
        priceAddAmount:data.price.priceAddAmount,
        images:iP.images,
    })
    let p = await product.save();
    return p; 
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
async function getProdsBySellerId(sellerId){
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
async function getProductPriceByProductId(pid){
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
                });
            })
        })
    }catch(err){
        console.error(err);
    }
}
async function getProductsByStoreLink(storeLink) {
    try{
        return new Promise(async (resolve, reject) => {
            let store = await Store.findOne({link:storeLink});
            if(store){
                if(store.isPublic){
                    let user = await User.findOne({idStore: store._id},{});
                    let products = await Product.find({seller:user._id},{"initialProduct":1,"newPrice":1,"isActive":1})
                    let prods = [...products] 
                    let newProds = []
                    var getingProds = new Promise((resolve1, reject) => {
                        prods.forEach(async (p,i) => {
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
async function getProductSeo(pid){
    try{
        return new Promise(async (resolve, reject) => {
            resolve(await Product.findById(pid,{"seo":1}))
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

async function updateProductSeo(pid,data){
    try{
        return new Promise(async (resolve, reject) => {
            resolve(await Product.findOneAndUpdate({_id:pid},{seo:data}))
        })
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    getAll,
    findByCategory,
    findById,
    assignProdToSeller,
    getProdsBySellerId,
    getProductPriceByProductId,
    getProductsByStoreLink,
    changeProductPrice,
    getProductImages,
    updateProductImages,
    getProductSeo,
    toggleActive,
    updateProductSeo
}
