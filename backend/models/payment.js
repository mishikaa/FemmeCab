const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    amount: {
        type: Number
    },
    transaction_id: {
        type: String
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("Payment", PaymentSchema);