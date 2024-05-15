const Layout = require("../models/Layout")

async function getAllLayouts(){
    return new Promise(async (resolve,reject)=>{
        await Layout.find()
        .then((layouts)=>{
            resolve(layouts);
        })
        .catch((err)=>{
            reject(err.message);
        })
    })
}
async function updateSingleProductRecommended(ob){
    return new Promise(async (resolve,reject)=>{
        await Layout.updateOne({"sectionRef":"recommended_items"},{ $pull: { data: { index: ob.index } } })
        .then(async (rslt)=>{
            await Layout.updateOne({"sectionRef":"recommended_items"},{ $push: { data: ob } })
            .then((rslt1)=>{
                resolve(rslt1);
            })
            .catch((err)=>{
                reject(err.message);
            })
        })
        .catch((err)=>{
            reject(err.message);
        })
    })
}
async function updateTopBannerImages(ob){
    return new Promise(async (resolve,reject)=>{
        console.log(ob)
        await Layout.updateOne({"sectionRef":"top_banner_images"},{data:ob} )
        .then(async (rslt)=>{
            resolve(rslt);
        })
        .catch((err)=>{
            console.error(err);
            reject(err.message);
        })
    })
}
async function updateSingleSectionCat(ob){
    return new Promise(async (resolve,reject)=>{
        console.log("=============ob============  ",ob)
        await Layout.updateOne({"sectionRef":"single_cat_prods"},{ $pull: { data: { index: ob.index } } })
        .then(async (rslt)=>{
            await Layout.updateOne({"sectionRef":"single_cat_prods"},{ $push: { data: ob } })
            .then((rslt1)=>{
                resolve(rslt1);
            })
            .catch((err)=>{
                reject(err.message);
            })
        })
        .catch((err)=>{
            reject(err.message);
        })
    })
}
module.exports = {
    getAllLayouts,
    updateSingleProductRecommended,
    updateTopBannerImages,
    updateSingleSectionCat
}