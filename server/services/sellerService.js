const User = require("../models/User");
const Store = require("../models/Store");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const emailService = require("../services/emailService")
const settingsService = require("../services/settingsService")

const {getStoreById} = require("./storeService");

async function getStoreNameById(id) {
    let store = await Store.find({ _id: id }).select("title -_id");
    return store[0].title;
  }
  async function getSellerStoreById(id) {
    let seller = await User.find({ _id: id });
    return seller[0].idStore;
  }
  async function getSellers() {
    var sellers = await User.find({ isSeller: true }).select("-password");
    for (let i = 0; i < sellers.length; i++) {
      sellers[i] = sellers[i].toJSON();
      let store = await getStoreNameById(sellers[i].idStore);
      sellers[i]["storeName"] = store;
    }
    return sellers;
  }
  async function getUnVerifiedSellers() {
    var sellers = await User.find({ isSeller: true ,isVerified:false}).select("-password");
    for (let i = 0; i < sellers.length; i++) {
      sellers[i] = sellers[i].toJSON();
      let store = await getStoreNameById(sellers[i].idStore);
      sellers[i]["storeName"] = store;
    }
    return sellers;
  }
  async function addSeller(userData) {
    try {
      let {
        name,
        email,
        gender,
        phoneNumber,
        password,
        repeatPassword,
        isSeller,
        storeName,
        categories,
        line1,
        line2,
        zipcode,
        city,
        country,
        state,
      } = userData;
      let errors = [];
      let checkUser = await User.findOne({ email });
      if (checkUser) errors.push("This email address is already in use; ");
      if (storeName.length == 0) errors.push("Store Name is Required");
      if (categories.length == 0)
        errors.push("At least one categorie is Required");
      if (line1.length == 0) errors.push("Address Line 1 is Required");
      //city, country, state
      if (zipcode.length == 0) errors.push("Zip Code is Required");
      if (country.length == 0) errors.push("Country is Required");
      if (state.length == 0) errors.push("Country is Required");
  
      if (name.length < 3 || name.length > 50)
        errors.push(
          "Name should be at least 3 characters long and max 50 characters long; "
        );
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false)
        errors.push("Please fill a valid email address; ");
      if (password !== repeatPassword) errors.push("Passwords should match; ");
      if (password.length < 8)
        errors.push("Password should be at least 8 characters long; ");
      if (password.length > 20)
        errors.push("Password should be at max 20 characters long; ");
      if (errors.length >= 1) throw { message: [errors] };
      let newData = {};
      let store = new Store({ title: storeName, categories: categories });
      let storeId = await store.save();
      newData = {
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        gender: gender,
        isSeller: true,
        idStore: storeId._id,
        address: {
          line1: line1,
          line2: line2,
          zipCode: zipcode,
          city: city,
          country: country,
          state: state,
        },
      };
  
      let user = new User(newData);
      return await user.save();
    } catch (err) {
      console.error(err);
      return "error";
    }
  }
  async function getSellerById(id) {
    var seller = await User.find({ _id: id, isSeller: true }).select("-password");
    let sellerStore = await getStoreById(seller[0].idStore);
    seller[0] = seller[0].toJSON();
    seller[0].store = sellerStore;
    return seller[0];
  }
  async function updateSeller(id, data) {
    try {
      let sellerData = { ...data.seller } || {};
      let storeData = { ...data.store } || {};
      let storeID = await getSellerStoreById(id);
      let rslt1 = await Store.findOneAndUpdate({ _id: storeID }, storeData);
      let rslt2 = await User.findOneAndUpdate(
        { _id: id, isSeller: true },
        sellerData
      );
      return { rslt1, rslt2 };
    } catch (err) {
      console.error(err);
    }
  }
async function getDashboardHome(sellerId) {
    let orderCount = {
        Pending: 0,
        Completed: 0,
        Processing: 0,
        Cancelled: 0,
        Refunded: 0,
    }
    let orders = await Order.find({sellerId:sellerId});
    let products = await Product.find({seller:sellerId});
    let t =0;
    let sales = 0;
    let earnings = 0;
    orders.forEach((element) => {
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
    let productCount = {
      Live: 0,
      Offline: 0,
  }
    products.forEach((element) => {
        pt++;
        console.log(element);
        if(element.isActive){
          productCount.Live++;
        }else{
          productCount.Offline++;
        }
    });
    productCount.Total=pt;
    return {orders:orderCount,products:productCount,info:{earnings:earnings,sales:sales}};
}
async function verifySeller(id) {
  try{
    return new Promise(async (resolve,reject)=>{
      const seller = await User.findById(id);
      if(!seller) throw "No such user found";
      
      let verified = await seller.update({isVerified:true});
      if(verified){
            await emailService.sendEmail(seller.email, "Account is verified !", "Your account is verified.<br><br>You can now start selling on Adghal !<br><br>Login <a href='http://localhost:3000/auth/login' target='_blank'>Here</a>")
            .then((t)=>{
                resolve({sent:"true"});
            })
            .catch((f)=>{
                reject({sent:"false"});
            })
        }
    })
  }catch(e){
      console.log("Error in verifying seller");
      throw e;
  }
}
async function isSellerVerified(id) {
  try{
    return new Promise(async (resolve,reject)=>{
      const seller = await User.findById(id);
      if(!seller) throw "No such user found";
      
      resolve({status:seller.isVerified});
    })
  }catch(e){
      console.log("Error in verifying seller");
      throw e;
  }
}
async function subscribe(sellerId) {
  try{
    return new Promise(async (resolve,reject)=>{
      const seller = await User.findById(sellerId);
      if(!seller) throw "No such user found";
      let dateAfter30Days = new Date();
      dateAfter30Days.setDate(dateAfter30Days.getDate()+30);
      let newSub ={
        isSubscribed:true,
        fee:30,
        startDate:new Date(),
        endDate:dateAfter30Days,
      }
      await User.findOneAndUpdate({_id:sellerId},{subscription:newSub,nbrNotPassedToSupplier:0}).then((success)=>{
        resolve(success);
      })
      .catch((err)=>{
        reject(err.message)
      })
    })
  }catch(e){
      console.log("Error in verifying seller");
      throw e;
  }
}

async function deleteSeller(id) {
  return new Promise(async (resolve, reject) => {
    await User.findOneAndDelete({_id:id,isSeller:true})
        .then(async(user)=>{
            if(user){
                await Store.findOneAndDelete({_id:user.idStore})
                .then(async (store)=>{
                  if(store){
                    await Cart.findOne({user:id}).then(async (cart)=>{
                      if(cart){
                          await cart.delete().then((delCart)=>{
                              resolve({msg:"Deleted"})
                          }).catch((err)=>{
                              resolve(err.message)
                          })
                      }else{
                          resolve({msg:"Deleted"})
                      }
                  })
                  }else{
                    reject({msg:"Store not deleted !"})
                  }
                }).catch((err)=>{
                  reject(err.message)
                })
            }else{
                reject({msg:"Invalid Seller!"});
            }
        })
        .catch((err)=>{
            reject(err.message);
        })
  })
}
async function getSellerIdByStoreId(storeId) {
  try{
    return new Promise(async (resolve,reject)=>{
      const seller = await User.findOne({idStore:storeId});
      if(!seller) throw "No such user found";
      resolve(seller._id);
    })
  }catch(e){
      console.log("Error in verifying seller");
      throw e;
  }
}
module.exports = {
    getSellers,
    getSellerById,
    updateSeller,
    getSellerStoreById,
    addSeller,
    getDashboardHome,
    getUnVerifiedSellers,
    verifySeller,
    isSellerVerified,
    deleteSeller,
    subscribe,
    getSellerIdByStoreId
};
  