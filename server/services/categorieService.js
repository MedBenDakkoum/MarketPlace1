const Categorie = require('../models/Categorie');

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

module.exports = {
    getAll,
    getCatsFromRefs
}