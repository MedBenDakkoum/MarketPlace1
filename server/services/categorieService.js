const Categorie = require('../models/Categorie');

async function getAll() {
    try{
        let all = await Categorie.find();
        return all
    }catch(err){
        throw err;
    }
} 

module.exports = {
    getAll,
}