const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: ['Title is required'],
        trim: true,
        minlength: [3, 'Title should be at least 3 characters long'],
        maxLenght: [50, "Title can't be more than 50 cahracters long"]
    },
    link: {
        type: String,
        // validate: {
        //     validator: function (v) {
        //         return (v != 'Choose...');
        //     }
        // }
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref:'Categorie'
    }],
    products: [{
        type: mongoose.Types.ObjectId,
        ref:'Product'
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref:'Order'
    }],
    isPublic : {
        type:Boolean,
        default:true
    }
},{timestamps:true});
storeSchema.pre('save', function(next) {
    this.link = this.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    next()
})
module.exports = mongoose.model('Store', storeSchema);