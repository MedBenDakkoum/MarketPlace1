const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    ref: {
        type: String,
        required: true
    },
    newPrice: {
        type: Number,
        required: true,
        trim: true,
    },
    images: [{
        type: String,
    }],
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);