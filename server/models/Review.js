const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    stars: {
        type: Number,
    },
    text:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('Review', reviewSchema);