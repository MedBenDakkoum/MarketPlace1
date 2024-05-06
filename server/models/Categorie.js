const mongoose = require('mongoose');

const CategorieSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    reference:{
        type:String
    },
    name:{
        type:Object
    },
    parent: {
        type:String,
    },
    level:{
        type:Number,
    },
    description:{
        type:Object
    },
    link_rewrite:{
        type:Object
    }

});


module.exports = mongoose.model('Categorie', CategorieSchema);