const User = require('../models/User');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const initialProduct = require('../models/initialProduct');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');
const { SALT } = require('../config/config');

async function getCustomers(){
    try{
        return new Promise(async (resolve,reject)=>{
            await User.find().select("-address").then(async function(customers){
                let rslt = []
                for (const customer of customers) {
                    await Order.find( {'clientId':customer._id},{"createdAt":1} )
                        .sort({"createdAt": 1})
                            .then(function(orders){
                                rslt.push({
                                    _id:customer._id,
                                    name:customer.name,
                                    isSeller:customer.isSeller,
                                    userId:customer.userId,
                                    orders:orders.length,
                                    lastOrderAt:orders[0]?.createdAt,
                                    active:customer.isActive
                                })
                            });
                }
                resolve(rslt);
            })
        })
    }catch(err){
        console.error(err);
    }
}

async function edit(userId, userData) {
    return await User.updateOne({ _id: userId }, { $set: { ...userData } });
}

async function getUserById(userId) {
    return await User.findById(userId).select("-password");
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
                return await User.findOneAndUpdate({"_id":id},{password:hash});
            }
            else{
                throw new Error("The new password and the repeat of it are not identical.");
            }
        }else{
            throw new Error("The current password is incorrect.");
        }
    }catch(err){
        throw new Error(err.message);
    }
}

// async function addToCart(id,data){
//     try{
//         return new Promise(async (resolve, reject) => {
//             const cart = await Cart.findOne({ user: id });
//             console.log(cart);
//             if(!cart){
//                 const newCart = new Cart({
//                     user: id,
//                     products: [{ id: data.id, attributes:data.attributes, quantity:data.quantity }]
//                 });
//                 await newCart.save();
//                 resolve(newCart);
//             }
//             const existingProductIndex = cart.products.findIndex(product =>
//                 product.id.equals(data.id) &&
//                 product.attributes.every(attr =>
//                     attributes.some(newAttr => newAttr.name === attr.name && newAttr.value === attr.value)
//                 )
//             );
//             if (existingProductIndex !== -1) {
//                 cart.products[existingProductIndex].quantity += data.quantity;
//             } else {
//                 cart.products.push({ id: data.id, attributes:data.attributes, quantity: data.quantity });
//             }
//             await cart.save();
//             resolve(cart);
//         });
//     }catch(err){
//         console.log("Error in adding to cart : ", err);
//         throw err;
//     }
// }


const getAddress = async (client)=> {
    return new Promise(async (resolve, reject) => {
        await User.findById(client,{"address":1}).then(function(user){
            if(user){
                resolve(user.address);
            }else{
                resolve({})
            }
        }).catch(function(err){
            reject("error getting address");
        })
    })
}
const changeUserActive = async (userId) =>{
    return new Promise(async (resolve, reject) => {
        await User.findById(userId)
            .then(async(user)=>{
                if(user){
                    await user.update({isActive:!user.isActive})
                    .then((rslt)=>{
                        resolve({msg:"Activity changed!",status:true});
                    })
                    .catch((e)=>{
                        reject({msg:"Something went wrong!",status:false});
                    })
                }else{
                    reject({msg:"Invalid User!",status:false});
                }
            })
    })
}
module.exports = {
    edit,
    getUserById,
    updateProfile,
    updatePassword,
    getAddress,
    getCustomers,
    changeUserActive
}