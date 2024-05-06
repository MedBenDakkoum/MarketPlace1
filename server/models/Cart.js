const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CartSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    products:[{
        id: {type : mongoose.Types.ObjectId ,ref:'Product'} ,
        attributes:{type:Object},
        quantity:Number
    }]
},{timestamps:true});

CartSchema.plugin(AutoIncrement, { inc_field: 'cartId' });

module.exports = mongoose.model('Cart', CartSchema);