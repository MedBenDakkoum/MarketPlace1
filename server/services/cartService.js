const Cart = require('../models/Cart');
const Product = require('../models/Product');
const initialProduct = require('../models/initialProduct');


function ObjectEquals(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => ObjectEquals(x[key], y[key]))
    ) : (x === y);
}
async function addToCart(userId, data) {
    try {
        let productId = data.id;
        let attributes = data.attributes;
        let quantity = data.quantity;
        let existingCartItem = await Cart.findOne({
            user: userId,
            products : {
                $elemMatch: {id:productId, attributes:attributes}
            }
        });
        if (existingCartItem) {
            let upProd = new Promise((resolve,reject)=>{
                let i=0;
                existingCartItem.products.map((prod)=>{
                    if(ObjectEquals(prod.attributes,attributes) && prod.id==productId){
                        prod.quantity += quantity
                        resolve("done");
                    }
                    if(i==existingCartItem.products.length-1){
                        resolve("not done");
                    }
                    i++;
                })
            })
            upProd.then(async function(s){
                console.log(s);
                await existingCartItem.save()
            });
        } else {
            await Cart.findOneAndUpdate(
                { user: userId },
                {
                    $push: {
                        products: {
                            id: productId,
                            attributes: attributes,
                            quantity: quantity
                        }
                    }
                },
                { upsert: true }
            );
        }

        return { success: true, message: "Product added to cart successfully" };
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return { success: false, message: "An error occurred while adding product to cart" };
    }
}
function removeFromCart(userId, cartItemId) {
    try{
        return new Promise(async (resolve,reject)=>{
            let cart = await Cart.findOne({ user: userId, products: { $elemMatch: { _id: cartItemId } } });
            if(cart){
                let result = await Cart.updateOne(
                    { user: userId },
                    { $pull: { products: { _id: cartItemId } } }
                );
                resolve(result);
            }else{
                reject({message:"Cart not found"})
            }
        })
    }catch(error){
        console.log('Error in removing item from cart', error);
        throw error;
    }
}
async function getCart(id){
    try{
        return new Promise(async (resolve, reject) => {
            let c = await Cart.find({user:id});
            let cartData = [...c[0].products];
            let prodCartInfo =  new Promise(async (resolve1, reject) => {
                let newData = [];
                let i =0;
                cartData.forEach(async function(prod){
                    let pr = await Product.findById(prod.id,{"initialProduct":1,"images":1,"newPrice":1});
                    let prName = await initialProduct.findById(pr.initialProduct,{"name":1});
                    newData.push(
                        {
                            itemId: prod._id,
                            id: prod.id,
                            info:{
                                img: pr.images[0],
                                name: prName.name,
                                price: pr.newPrice
                            },
                            attributes:prod.attributes,
                            quantity: prod.quantity
                        }
                    );
                    if(i==cartData.length-1){
                        resolve1(newData);
                    }
                    i++;
                })
            })
            prodCartInfo.then((rslt)=>{
                resolve(rslt);
            })
        })
    }catch(err){
        console.error(err);
        reject(err);
    }
}
module.exports = {
    addToCart,
    removeFromCart,
    getCart
}