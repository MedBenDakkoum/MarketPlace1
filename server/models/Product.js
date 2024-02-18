const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    ref: {
        type: String,
        required: true
    },
    price:{
        type:Number
    },
    newPrice: {
        type: Number,
        required: true,
    },
    earning:{
        type:Number
    },
    priceAddType:{
        type:String,
        default:"percentage"
    },
    priceAddAmount:{
        type:Number
    },
    images: [{
        type: String,
    }],
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type:String,
        default:"Pending"
    },
    initialProduct:{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    seo:{
        metaTitle:String,
        metaDescription:String,
        friendlyUrl:String
    }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);