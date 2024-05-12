const productService = require("./productService")
const initialProduct = require('../models/initialProduct');
const Product = require('../models/Product');
const cartService = require("./cartService")
const smsService = require('../services/smsService');
const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Invoice = require('../models/Invoice');
var moment = require('moment'); 
var pdf = require('html-pdf');
var fs = require('fs');
const { cloudinary } = require("../config/cloudinary");

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

async function getAll() {
    try{
        let all = await Order.find();
        return all
    }catch(err){
        throw err;
    }
} 
async function getUnVerified() {
    try{
        let all = await Order.find({isVerified:false});
        return all
    }catch(err){
        throw err;
    }
}
const getTotalPrices = (arr)=>{
    return new Promise(async (resolve,reject)=>{
        let i = 0;
        let sellerTotalPrice = 0;
        let clientTotalPrice = 0;
        arr.forEach(async function(item){
            let prices = await productService.getProductPriceByProductId(item.productId);
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
async function getSellerEarnings(prods){
    return new Promise(async (resolve,reject)=>{
        let earnings = 0;
        for(let prod of prods){
            console.log(prod);
            let price = await productService.getProductPriceByProductId(prod.productId);
            earnings = earnings+(price.price - price.initialPrice);
        }
        resolve(earnings.toFixed(2));
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
async function getVerifiedOrdersByStoreId(storeId) {
    try {
        const orders = await Order.find({
            "products.storeId": storeId,
            "isVerified":true
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
async function generatePDFfromHTML(htmlContent) {
    return new Promise((resolve1,reject1)=>{
        pdf.create(htmlContent).toBuffer(function(err, buffer){
            new Promise((resolve) => {
                cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
                    return resolve(uploadResult);
                }).end(buffer);
            }).then((uploadResult) => {
                resolve1(uploadResult.url);
            });
        });
    })
}

async function generateInvoice(orderId,lang){
    try{
        return new Promise(async (resolve,reject)=>{
            let orderObject = await Order.findById(orderId);
            let user = await User.findById(orderObject.clientId);
            let dueDate = new Date(); 
            let prods = [];
            let prodsHtml = "" ;
            let totalProdsHtml = 0 ;
            orderObject.products.forEach(async function(prod){
                let prodObject = await productService.getFullProd(prod.productId);
                prods.push({
                    productName: prodObject.initialProduct.name[lang],
                    price:prodObject.product.newPrice
                });
                totalProdsHtml+=prodObject.product.newPrice*prod.quantity;
                prodsHtml+=`<tr class="item"><td>${prodObject.initialProduct.name[lang]}</td><td>${prodObject.product.newPrice} * ${prod.quantity} = ${prodObject.product.newPrice*prod.quantity} TND</td></tr>`
            });
            let invoiceObject = new Invoice({
                created: new Date(),
                due: dueDate.addDays(30),
                company: {
                    name:"Company Title",
                    addressLine1:"123 Street Omrane",
                    addressLine2:"Monastir 5000"
                },
                clientName:user.name,
                clientEmail:user.email,
                paymentMethod:orderObject.paymentMethod,
                products:prods
            });
            await invoiceObject.save();
            let invoice = `<html>\n \
                <head>\n \
                    <meta charset="utf-8" />\n \
                    <title>Invoice of ${orderId}</title>\n \
            \n \
                    <style>\n \
                        .invoice-box {max-width: 800px;\n \
                            margin: auto;\n \
                            padding: 30px;\n \
                            border: 1px solid #eee;\n \
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);\n \
                            font-size: 16px;\n \
                            line-height: 24px;\n \
                            font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;\n \
                            color: #555;\n \
                        }\n \
            \n \
                        .invoice-box table {\n \
                            width: 100%;\n \
                            line-height: inherit;\n \
                            text-align: left;\n \
                        }\n \
            \n \
                        .invoice-box table td {\n \
                            padding: 5px;\n \
                            vertical-align: top;\n \
                        }\n \
            \n \
                        .invoice-box table tr td:nth-child(2) {\n \
                            text-align: right;\n \
                        }\n \
            \n \
                        .invoice-box table tr.top table td {\n \
                            padding-bottom: 20px;\n \
                        }\n \
            \n \
                        .invoice-box table tr.top table td.title {\n \
                            font-size: 45px;\n \
                            line-height: 45px;\n \
                            color: #333;\n \
                        }\n \
            \n \
                        .invoice-box table tr.information table td {\n \
                            padding-bottom: 40px;\n \
                        }\n \
            \n \
                        .invoice-box table tr.heading td {\n \
                            background: #eee;\n \
                            border-bottom: 1px solid #ddd;\n \
                            font-weight: bold;\n \
                        }\n \
            \n \
                        .invoice-box table tr.details td {\n \
                            padding-bottom: 20px;\n \
                        }\n \
            \n \
                        .invoice-box table tr.item td {\n \
                            border-bottom: 1px solid #eee;\n \
                        }\n \
            \n \
                        .invoice-box table tr.item.last td {\n \
                            border-bottom: none;\n \
                        }\n \
            \n \
                        .invoice-box table tr.total td:nth-child(2) {\n \
                            border-top: 2px solid #eee;\n \
                            font-weight: bold;\n \
                        }\n \
            \n \
                        @media only screen and (max-width: 600px) {\n \
                            .invoice-box table tr.top table td {\n \
                                width: 100%;\n \
                                display: block;\n \
                                text-align: center;\n \
                            }\n \
            \n \
                            .invoice-box table tr.information table td {\n \
                                width: 100%;\n \
                                display: block;\n \
                                text-align: center;\n \
                            }\n \
                        }\n \
            \n \
                        /** RTL **/\n \
                        .invoice-box.rtl {\n \
                            direction: rtl;\n \
                            font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;\n \
                        }\n \
            \n \
                        .invoice-box.rtl table {\n \
                            text-align: right;\n \
                        }\n \
            \n \
                        .invoice-box.rtl table tr td:nth-child(2) {\n \
                            text-align: left;\n \
                        }\n \
                    </style>\n \
                </head>\n \
            \n \
                <body>\n \
                    <div class="invoice-box">\n \
                        <table cellpadding="0" cellspacing="0">\n \
                            <tr class="top">\n \
                                <td colspan="2">\n \
                                    <table>\n \
                                        <tr>\n \
                                            <td class="title">\n \
                                                <img\n \
                                                    src="https://cdn.logojoy.com/wp-content/uploads/20230905134502/Dropbox-logo-1024x576.png"\n \
                                                    style="width: 100%; max-width: 300px"\n \
                                                />\n \
                                            </td>\n \
            \n \
                                            <td>\n \
                                                Invoice #: ${invoiceObject.invoiceId}<br />\n \
                                                Created: ${ moment(new Date()).format("YYYY-MM-DD")}<br />\n \
                                                Due: ${ moment(new Date()).add(30,"days").format("YYYY-MM-DD")}\n \
                                            </td>\n \
                                        </tr>\n \
                                    </table>\n \
                                </td>\n \
                            </tr>\n \
            \n \
                            <tr class="information">\n \
                                <td colspan="2">\n \
                                    <table>\n \
                                        <tr>\n \
                                            <td>\n \
                                                ${invoiceObject.company.name}<br />\n \
                                                ${invoiceObject.company.addressLine1}<br />\n \
                                                ${invoiceObject.company.addressLine2}\n \
                                            </td>\n \
            \n \
                                            <td>\n \
                                                ${invoiceObject.clientName}<br />\n \
                                                ${invoiceObject.clientEmail}\n \
                                            </td>\n \
                                        </tr>\n \
                                    </table>\n \
                                </td>\n \
                            </tr>\n \
            \n \
                            <tr class="heading">\n \
                                <td>Payment Method</td>\n \
            \n \
                            </tr>\n \
            \n \
                            <tr class="details">\n \
                                <td>${invoiceObject.paymentMethod}</td>\n \
            \n \
                            </tr>\n \
            \n \
                            <tr class="heading">\n \
                                <td>Item</td>\n \
            \n \
                                <td>Price</td>\n \
                            </tr>\n \
            \n \
            `+
            prodsHtml
            +`              <tr class="total">\n \
                                <td></td>\n \
            \n \
                                <td>Total: ${totalProdsHtml} TND</td>\n \
                            </tr>\n \
                        </table>\n \
                    </div>\n \
                </body>\n \
            </html>\n \
            `
            await generatePDFfromHTML(invoice)
            .then(async function(invoiceUrl){
                await invoiceObject.update({url : invoiceUrl})
                .then(function(rslt){
                    resolve(invoiceObject._id);
                })
            })
        })
    }catch(e){
        console.log(e);
        throw e;
    }
}

async function makeOrder(userId,paymentMethod,lang){
    try{
        return new Promise(async (resolve,reject) =>{
            let today = moment().format('L');
            let cart = await cartService.getCart(userId);
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
                getSellerEarnings(prods).then(async (earnings)=>{
                    let cartTotal = await getTotal(cart);
                    let newOrder = new Order(
                        {
                            date:today,
                            status:"PENDING",
                            totalProductsPrice:cartTotal,
                            totalShippingPrice: 7,
                            totalDiscount:0,
                            totalPrice:cartTotal+7,
                            products:prods,
                            clientId:userId,
                            paymentMethod:paymentMethod,
                            sellerEarnings:earnings
                        }
                    );
                    await newOrder.save().then(async (e)=>{
                        let emptyCart = await Cart.findOne({user:userId});
                        emptyCart.products=[]
                        emptyCart.save();
                        await generateInvoice(newOrder._id,lang)
                        .then(async function(rslt){
                            await newOrder.update({invoiceId:rslt})
                            .then(function(rrr){
                                resolve({message:"Order Placed"})
                            })
                        })
                    }).catch(function(e){
                        reject({message:"Error making new Order"});
                    }); 
                })
            })
        })
    }catch(err){
        throw err;
    }
}

async function getSingleOrder(OrderId) {
    try {
        return new Promise( async (resolve ,reject) =>{
            await Order.findById(OrderId).then(async function(order){            
                await User.findById(order.clientId)
                .then( async function(customer){
                    let orderCount = await Order.find({clientId:order.clientId,status:"Completed"}).count();
                    let spent = await Order.aggregate([
                        {
                            $match: { clientId: order.clientId }
                        },
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: "$totalPrice" }
                            }
                        }
                    ]);   
                    let productsIds = [];
                    order.products.map(function(productObject){
                        productsIds.push(productObject.productId.toString());
                    })
                    console.log(productsIds);
                    let prods = [];
                    for (let i = 0; i < productsIds.length; i++) {
                        let product = await Product.findOne({ _id: productsIds[i] },{"initialProduct":1,"newPrice":1});
                        if(product){
                            prods.push(product);
                        }else{
                            prods.push({})
                        }
                        
                    }
                    let ipProdsIds = [];
                    prods.forEach(function(prod){
                        if(prod.hasOwnProperty(initialProduct)){
                            ipProdsIds.push(prod.initialProduct)
                        }else{
                            ipProdsIds.push("#");
                        }
                    })
                    let iProds = [];
                    for (let i = 0; i < ipProdsIds.length; i++) {
                        if(ipProdsIds[i]!=="#"){
                            let product = await initialProduct.findOne({_id : ipProdsIds[i] },{"ref":1,"name":1})
                            iProds.push(product);
                        }else{
                            iProds.push({})
                        }
                    }
                    await Invoice.findById(order.invoiceId)
                        .then((invoiceUrl)=>{
                        let rsltProds = [];
                        let i=0;
                        iProds.forEach(function(iProd){
                            rsltProds.push({
                                ref:iProd.ref || "#",
                                productName:iProd.name || "#",
                                price: prods[i].newPrice || "#",
                                quantity: order.products[i].quantity,
                                attributes: order.products[i].attributes,
                                total: order.products[i].quantity*prods[i].newPrice,
                            })
                            if(i==iProds.length-1){
                                let rslt = {
                                    info:{
                                        orderId:order.orderId,
                                        ref:order.reference || "",
                                        customerName: customer.name,
                                        total: order.totalPrice,
                                        paymentMethod: order.paymentMethod,
                                        status: order.status,
                                        date: order.date,
                                        statusUpdatesAt: moment(order.statusUpdatesAt).format("YYYY-MM-DD") || moment(new Date()).format("YYYY-MM-DD")
                                    },
                                    customer: {
                                        id: customer.userId,
                                        name: customer.name,
                                        email: customer.email,
                                        phoneNumber: customer.phoneNumber,
                                        registeredOn: moment(customer.createdAt).format('YYYY-MM-DD'),
                                        completedOrders: orderCount,
                                        totalSpent: spent[0].totalAmount,
                                        address: {
                                            line1: customer.address.line1,
                                            line2: customer.address.line2,
                                            country: customer.address.country,
                                            state: customer.address.state,
                                            city: customer.address.city,
                                            zipCode: customer.address.zipCode,
                                        },
                                    },
                                    products: rsltProds,
                                    messages: order.messages,
                                    invoiceUrl: invoiceUrl.url,
                                    isVerified: order.isVerified,
                                }
                                resolve(rslt);
                            }
                            i++;
                        })
                    });
                })
            });
        })
    } catch (err) {
        throw err;
    }
}

async function updateOrderStatus(orderId, newStatus){
    try{
        const order = await Order.findById(orderId);
        if(!order) throw "No such order found";
        
        return order.update({status:newStatus,statusUpdatesAt:new Date()});
    }catch(e){
        console.log("Error in updating the order status");
        throw e;
    }
}
async function addOrderMessage(orderId, newMsg){
    try{
        const order = await Order.findById(orderId);
        if(!order) throw "No such order found";
        
        return order.update({$push : {
            messages : {
                messageSubject: newMsg.subject,
                messageContent: newMsg.content,
                messageDate: new Date()
            } 
        }});
    }catch(e){
        console.log("Error in updating the order status");
        throw e;
    }
}
async function getInvoices(body){
    try{
        let by = body.by;
        let values = body.values;
        switch(by){
            case 'date':
                return await Invoice.find({
                    created: {
                        $gte: values.from,
                        $lte: values.to
                    }
                })
                break;
            case 'orderStatus':
                let ods = await Order.find({status:{ $in: values}},{invoiceId:1});
                let ids = [];
                for (let i=0 ;i<ods.length;i++) {ids.push(ods[i].invoiceId)};
                return Invoice.find({_id:{ $in: ids}}).sort('-created');
                break;
            default:
                break;
        }
    }catch(e){
        console.log("Error in getting invoices");
        throw e;
    }
}
async function getListOfNumbersFromOrderId(orderId){
    return new Promise(async (resolve,reject)=>{
        let order = await Order.findById(orderId);
        let listStores = [];
        order.products.forEach((prod)=>{
            listStores.push(prod.storeId)
        })
        let sellers = await User.find({idStore: {$in:listStores}},{phoneNumber:1});
        let listNum = [];
        sellers.forEach((seller)=>{
            listNum.push(seller.phoneNumber);
        })
        resolve(listNum);
    })
}
async function verifyOrder(orderId){
    try{
        return new Promise(async (resolve,reject)=>{
            const order = await Order.findById(orderId);
            if(!order) throw "No such order found";
            
            let verified = await order.update({isVerified:true});
            if(verified){
                let listOfNums = await getListOfNumbersFromOrderId(orderId);
                await smsService.sendMultipleSms(listOfNums,"You got a new order on Adghal !")
                .then(async (t)=>{
                    order.products.map(async (prod)=>{
                        await Product.findOneAndUpdate({_id:prod.productId},{$inc:{verifiedOrders:1}})
                    })
                    resolve({sent:"true"});
                })
                .catch((f)=>{
                    reject({sent:"false"});
                })
            }
        })
    }catch(e){
        console.log("Error in verifying order");
        throw e;
    }
}
module.exports = {
    getOrdersById,
    getOrdersByClientId,
    makeOrder,
    getAll,
    getSingleOrder,
    updateOrderStatus,
    addOrderMessage,
    generateInvoice,
    getInvoices,
    getUnVerified,
    verifyOrder,
    getListOfNumbersFromOrderId,
    getVerifiedOrdersByStoreId
}
