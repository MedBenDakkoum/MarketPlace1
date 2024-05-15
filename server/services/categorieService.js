const Categorie = require('../models/Categorie');
const Product = require('../models/Product');
const initialProduct = require('../models/initialProduct');

async function getAll() {
    try{
        let all = await Categorie.find();
        return all
    }catch(err){
        throw err;
    }
} 
async function getCatsFromRefs(refs) {
    return new Promise(async (resolve,reject)=>{
        await Categorie.find({reference : {$in: refs}}).then((cats)=>{
            rslt = {};
            cats.forEach((cat)=>{
                rslt[cat.reference] = cat.name
            })
            resolve(rslt);
        })
    })
} 
function getInitProdFromIdList(id,arr){
    return new Promise(async (resolve, reject) => {
        resolve(arr.filter(a=>a._id==id.toString())[0]);
    })
}
async function getProdsByCatRef(ref){
    return new Promise(async (resolve,reject)=>{
        await initialProduct.find({category:ref},{
            category:1,
            additional_categories:1,
            ref:1,
            name:1,
            features:1
        }).then(async (allInitProds)=>{
            let initialProductIds = allInitProds.map(product => product._id);
            await Product.find({
                initialProduct: { $in: initialProductIds } },
                {
                    images:1,
                    isActive:1,
                    seller:1,
                    newPrice:1,
                    initialProduct:1,
                }
            ).sort({review:1}).limit(8)
            .exec(function(err,prods){
                if(err){
                    console.error(err);
                    reject(err.message)
                }else{
                    let aa = [];
                    let iii=0;
                    prods.map(async (prod)=>{
                        aa.push({...prod._doc,initData:await getInitProdFromIdList(prod.initialProduct,allInitProds)});
                        if(iii==prods.length-1){
                            resolve(aa)
                        }
                        iii++;
                    })
                }
            })
        })
    })
}
module.exports = {
    getAll,
    getCatsFromRefs,
    getProdsByCatRef
}