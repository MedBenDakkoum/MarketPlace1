const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    date:{
        type:String
    },
    reference:{
        type:String
    },
    status: {
        type:String,
    },
    statusUpdatesAt:{
        type:Date
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
            quantity:Number,
            passedToSupplier:Boolean
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
    },
    messages:[{
        messageSubject: String,
        messageContent: String,
        messageDate: Date
    }],
    invoiceId:{
        type: mongoose.Types.ObjectId,
        ref:'Invoice'
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });



module.exports = mongoose.model('Order', orderSchema);