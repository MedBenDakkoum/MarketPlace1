const mongoose = require('mongoose');

const pageLayoutSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    section: {
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

module.exports = mongoose.model('PageLayout', pageLayoutSchema);