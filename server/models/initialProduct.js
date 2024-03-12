const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const initialProductSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    ref: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    images: [{
        type: String,
    }],
    accessories: [{
        type: String,
    }],
    features: [{
        name:String,
        value:String
    }],
    quantity:{
        type:Number
    },
    wholeSalePrice:{ //
        type:Number
    },
    price:{
        type:Number
    },
    width:{
        type:Number
    },
    height:{
        type:Number
    },
    depth:{
        type:Number
    },
    weight:{
        type:Number
    },
    isActive:{
        type:Boolean
    },
    isAvailable:{
        type:Boolean
    },
    manufacturerName:{ //
        type:String
    },
    lastUpdated:{ //
        type:String
    },
    meta_title:{
        type:String
    },
    meta_description:{
        type:String
    },
    friendlyUrl:{
        type:String
    },
    description_short:{
        type:String
    }
});

initialProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('initialProduct', initialProductSchema);