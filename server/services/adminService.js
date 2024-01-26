const User = require('../models/User');
const Store = require('../models/Store')
const Admin = require('../models/Admin');

async function getStoreNameById(id){
    let store = await Store.find({"_id":id}).select('title -_id');
    return store[0].title;
}
async function getStoreById(id){
    let store = await Store.find({"_id":id});
    return store[0];
}
async function getSellers() {
    var sellers = await User.find({"isSeller":true}).select("-password");
    for (let i=0;i<sellers.length;i++){
        sellers[i] = sellers[i].toJSON();
        let store = await getStoreNameById(sellers[i].idStore);
        sellers[i]["storeName"] = store;
    }
    return sellers;
}
async function getSellerById(id) {
    var seller = await User.find({"_id":id,"isSeller":true}).select("-password");
    let sellerStore = await getStoreById(seller[0].idStore);
    seller[0] = seller[0].toJSON();
    seller[0].store = sellerStore;
    return seller[0];
}
async function updateSeller(id,data){
    try{
        let newData = {
            "isActive": data.isActive,
            "gender": data.gender,
            "name": data.name,
            "email": data.email,
            "phoneNumber": data.email,
            "address": data.address
        }
        console.log(data.store);

        let rslt1 = await Store.findOneAndUpdate({"_id":data.idStore},data.store);
        let rslt2 = await User.findOneAndUpdate({"_id":id,"isSeller":true},newData);
        return {rslt1,rslt2}
    }catch(err){
        console.error(err);
    }
}
async function getAdmin(id) {
    try{
        let a = await Admin.findById(id);
        if(a){
            return a;
        }else{
            throw { statusCode: 404, message: 'No user with this id found'}
        }
    }catch{
        throw { statusCode: 404, message: 'No user with this id found'}
    }
}
module.exports = {
    getSellers,
    getAdmin,
    getSellerById,
    updateSeller
}