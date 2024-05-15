const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipientType: {
        type: String,
        enum: ['User','Employee', 'Admin']
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'recipientType' 
    },
    message: String,
    read: {
        type: Boolean, 
        default: false 
    },
},{timestamps:true})

module.exports = mongoose.model('Notification', notificationSchema);