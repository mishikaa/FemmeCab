const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RideSchema = new Schema({
    pickupAddress: {
        type: String
    },
    dropoffAddress: {
        type: String
    }, 
    distance: {
       type: Number
    },
    duration: {
        type: Number
    },
    paymentId: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type : Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model("Ride", RideSchema);