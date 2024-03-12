const mongoose = require('mongoose');

const CategorieSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    reference:{
        type:String
    },
    name:{
        type:String
    },
    parent: {
        type:String,
    },
    level:{
        type:Number,
    },
    description:{
        type:String
    },
    link_rewrite:{
        type:String
    }

});


module.exports = mongoose.model('Categorie', CategorieSchema);