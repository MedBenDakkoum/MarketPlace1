const mongoose = require('mongoose');

const modelTestSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    attr1: {
        type: String,
    }
},{timestamps:true})


module.exports = mongoose.model('ModelTest', modelTestSchema);