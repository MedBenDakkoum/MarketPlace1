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
        type: Object,
    },
    description: {
        type: Object,
    },
    images: [{
        type: String,
    }],
    accessories: [{
        type: String,
    }],
    features: [{
        name:Object,
        value:Object
    }],
    quantity:{
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
    lastUpdated:{ 
        type:String
    },
    meta_title:{
        type:Object
    },
    meta_description:{
        type:Object
    },
    description_short:{
        type:Object
    },
    attributes:[{
        name: {
            type: Object
        },
        values: [{
            type:Object
        }]
    }],
    additional_categories:[{
        type:String
    }]
});

initialProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('initialProduct', initialProductSchema);