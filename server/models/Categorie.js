const mongoose = require('mongoose');

const CategorieSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    reference:{
        type:String
    },
    name:{
        type:String
    },
    parentRef: {
        type:String,
    }
});


module.exports = mongoose.model('Categorie', CategorieSchema);