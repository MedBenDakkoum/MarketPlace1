const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    date:{
        type:String
    },
    status: {
        type:String,
    },
    totalProductsPrice:{
        type:Number
    },
    totalShippingPrice:{
        type:Number
    },
    totalDiscount:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    sellerEarnings:{
        type:Number
    },
    products:[
        {
            productId:{
                type:mongoose.Types.ObjectId,
                ref:"Product"
            },
            storeId:{
                type:mongoose.Types.ObjectId,
                ref:"Store"
            },
            attributes:Object,
            quantity:Number
        }    
    ],
    clientId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    trackingLink:{
        type:String
    },
    paymentMethod:{
        type:String
    }
},{timestamps:true});
orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });



module.exports = mongoose.model('Order', orderSchema);