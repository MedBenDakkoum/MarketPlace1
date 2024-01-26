const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    reference: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: ['Name is required'],
        trim: true,
        minlength: [3, 'Name should be at least 3 characters long'],
        maxLenght: [50, "Name can't be more than 50 cahracters long"]
    },
    category: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        required: ['Description is required'],
        minlength: [10, 'Description should be at least 10 characters long'],
        maxlength: [1000, 'Description should be max 500 characters long']
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: ['City is required'],
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        required: true,
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    active: {
        type: Boolean,
        default: true
    }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);