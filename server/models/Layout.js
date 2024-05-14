const mongoose = require('mongoose');

const LayoutSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    sectionRef:{
        type: String
    },
    sectionName:{
        type: String
    },
    data:[{
        type:Object
    }]
},{timestamps:true});

module.exports = mongoose.model('Layout', LayoutSchema);