const Order = require('../models/Order');
const {getProductPriceByProductId} = require("./productService")

const getTotalPrices = (arr)=>{
    return new Promise(async (resolve,reject)=>{
        let i = 0;
        let sellerTotalPrice = 0;
        let clientTotalPrice = 0;
        arr.forEach(async function(item){
            let prices = await getProductPriceByProductId(item.productId);
            sellerTotalPrice+=prices.initialPrice;
            clientTotalPrice+=prices.price;
            if(i==arr.length-1){
                resolve({sellerTotalPrice:sellerTotalPrice,clientTotalPrice:clientTotalPrice,sellerEarnings:clientTotalPrice-sellerTotalPrice})
            }
            i++;
        })
    })
}
const getTotal = async (cart)=> {
    return new Promise(async (resolve, reject) => {
        let s=0
        let i=0
        cart.forEach((e)=>{
            s+=e.info.price*e.quantity;
            if(i==cart.length-1){
                resolve(s);
            } 
            i++;
        })
    })
  }
async function getOrdersById(storeId) {
    try {
        const orders = await Order.find({
            "products.storeId": storeId
        });

        const newOrders = await Promise.all(orders.map(async (order) => {
            const newProducts = order.products
                .filter(product => product.storeId.toString() === storeId.toString())
                .map(product => ({
                    productId: product.productId,
                    quantity: product.quantity,
                    attributes: product.attributes
                }));

            const prices = await getTotalPrices(newProducts);

            return {
                prices: prices,
                products: newProducts,
                date: order.date,
                status: order.status,
                clientId: order.clientId,
                orderId: order.orderId,
                paymentMethod: order.paymentMethod || ""
            };
        }));

        return newOrders;
    } catch (err) {
        throw err;
    }
}
const getOrdersByClientId = async (client)=> {
    return new Promise(async (resolve, reject) => {
        let ods = await Order.find({clientId:client});
        resolve(ods);
    })
}
async function makeOrder(userId,paymentMethod){
    try{
        return new Promise(async (resolve,reject) =>{
            let today = moment().format('L');
            let cart = await getCart(userId);
            
            let diviseProds = new Promise(async (resolve1,reject)=>{
                let i=0
                let prods = []
                cart.forEach(async function(prod){
                    let se = await Product.findById(prod.id,{"seller":1});
                    let st = await User.findById(se.seller,{"idStore":1})
                    prods.push(
                        {
                            productId:prod.id,
                            storeId:st.idStore,
                            attributes:prod.attributes,
                            quantity:prod.quantity
                        }
                    )
                    if(i==cart.length-1){
                        resolve1(prods)
                    }
                    i++;
                })
            })
            diviseProds.then(async (prods)=>{
                let cartTotal = await getTotal(cart);
                let newOrder = new Order(
                    {
                        date:today,
                        status:"Pending",
                        totalProductsPrice:cartTotal,
                        totalShippingPrice: 7,
                        totalDiscount:0,
                        totalPrice:cartTotal+7,
                        products:prods,
                        clientId:userId,
                        paymentMethod:paymentMethod
                    }
                );
                await newOrder.save().then(async (e)=>{
                    let emptyCart = await Cart.findOne({user:userId});
                    emptyCart.products=[]
                    emptyCart.save();
                    resolve({message:"Order Placed"})
                }).catch(function(e){
                    reject({message:"Error making new Order"});
                }); 
            })
        })
    }catch(err){
        throw err;
    }
}
module.exports = {
    getOrdersById,
    getOrdersByClientId,
    makeOrder
}
