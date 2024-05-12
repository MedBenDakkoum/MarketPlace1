const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status:{
        type: String,
        default:"PENDING"
    },
    fullAmount:{
        type:Number
    },
    adminCommision:{
        type:Number
    },
    sellerAmount:{
        type:Number
    }
});

transactionSchema.plugin(AutoIncrement, { inc_field: 'transactionId' });

module.exports = mongoose.model("Transaction", transactionSchema);