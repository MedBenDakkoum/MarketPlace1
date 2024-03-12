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
    totalPrice:{
        type:Number
    },
    earnings:{
        type:Number
    },
    products:[{
        type:mongoose.Types.ObjectId,
        ref:'Product'  
    }],
    sellerId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    trackingLink:{
        type:String
    }
});
orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });



module.exports = mongoose.model('SellerOrder', orderSchema);