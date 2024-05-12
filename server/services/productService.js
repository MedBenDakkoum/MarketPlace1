const initialProduct = require('../models/initialProduct');
const Product = require('../models/Product');
const User = require('../models/User');
const Store = require('../models/Store');
const Fuse = require('fuse.js')

async function getAll() {
    return await Product.find({});
}
async function getFullProd(id){
    let prod = await Product.findById(id);
    let iProd = await initialProduct.findById(prod.initialProduct);
    return {
        product : prod,
        initialProduct: iProd
    }
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
    return new Promise(async (resolve, reject) => {
        try{
            let products = await Product.find({seller:sellerId});
            let newProds = []
            let i=0;
            if(products.length>0){
                products.forEach(async (product) => {
                    await initialProduct.findOne({_id: product.initialProduct}).then((e)=>{
                        newProds.push({product:product,initialProd:e});
                    })
                    if(i==products.length-1){
                        resolve(newProds)
                    }
                    i++;
                })
            }else{
                resolve([]);
            }
        }catch(err){
            reject(err);
        }
    })
}
async function getProductPriceByProductId(pid){
    try{
        return new Promise(async (resolve, reject) => {
            console.log(pid);
            await Product.findById(pid)
            .then(function(p){
                console.log(p);
                resolve({
                    "initialPrice":p?.price || "#",
                    "price":p?.newPrice || "#",
                    "priceAddType":p?.priceAddType || "percentage",
                    "priceAddAmount":p?.priceAddAmount || 0,
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
                        newPrice:calculate(data.priceAddType,parseFloat(data.initPrice),parseFloat(data.priceAddAmount)),
                        earning:calculate(data.priceAddType,parseFloat(data.initPrice),parseFloat(data.priceAddAmount))-parseFloat(data.initPrice)
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
            let prod = await Product.findById(pid,{"seo":1,initialProduct:1});
            let prodIp = await initialProduct.findById(prod.initialProduct,{"meta_description":1,"meta_title":1,"meta_description":1});
            resolve(prod.seo)
        })
    }catch(err){
        console.error(err);
    }
}

async function getProductAttributes(pid){
    try{
        return new Promise(async (resolve, reject) => {
            let iP = await Product.findById(pid,{initialProduct:1});
            resolve(await initialProduct.findById(iP.initialProduct,{"attributes":1}))
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
function getInitProdFromIdList(id,arr){
    return new Promise(async (resolve, reject) => {
        resolve(arr.filter(a=>a.item._id==id.toString())[0]);
    })
}
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
async function searchByKeyword(keyword){
    try{
        return new Promise(async (resolve, reject) => {
            await initialProduct.find({},{
                category:1,
                additional_categories:1,
                ref:1,
                description:1,
                description_short:1,
                isAvailable:1,
                name:1,
                features:1
            }).then(async (allInitProds)=>{
                const options = {
                    includeScore: true,
                    keys: ['name.fr', 'name.ar', 'description.fr','description.ar','description_short.fr','description_short.ar']
                }
                const fuse = new Fuse(allInitProds, options)
                const result = fuse.search(keyword);
                let initialProductIds = result.map(product => product.item._id);
                await Product.find({
                    initialProduct: { $in: initialProductIds } },
                    {
                        images:1,
                        isActive:1,
                        seller:1,
                        newPrice:1,
                        initialProduct:1,
                        review:1,
                        verifiedOrders:1
                    }
                ).then(async (products)=>{
                        console.log(products.length)
                        let newProds = []
                        let i =0;
                        products.forEach(async (product)=> {
                            let ob = JSON.stringify(product);
                            let aa = await getInitProdFromIdList(product.initialProduct,result);
                            let newAa = JSON.stringify(aa.item)
                            newProds.push({...JSON.parse(ob),initData:{...JSON.parse(newAa)}});
                            if(i==products.length-1){
                                resolve(newProds);
                            }
                            i++;
                        })
                    })
                    .catch((err)=>{
                        console.log(err);
                        reject("Error in Searching");
                    })
            })
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
    updateProductSeo,
    getProductAttributes,
    getFullProd,
    searchByKeyword
}
