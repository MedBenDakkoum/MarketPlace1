const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const invoiceSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    created: { type: Date, default: Date.now },
    due: { type: Date, default: Date.now },
    company: {
        name:String,
        addressLine1:String,
        addressLine2:String,
    },
    clientName:{
        type:String
    },
    clientEmail:{
        type:String
    },
    paymentMethod:{
        type:String
    },
    products:[{
        productName:String,
        price:Number,
    }],
    url:{
        type:String
    }
});

invoiceSchema.plugin(AutoIncrement, { inc_field: 'invoiceId' });

module.exports = mongoose.model('Invoice', invoiceSchema);