const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { timeStamp } = require('console');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    phoneNumber: {
        type: Number,
    },
    savedAddress: {
        type: String
    },
    rideDetails:  {
        type: Schema.Types.ObjectId,
        ref: "Ride"
    },
    emergencyContact: {
        type: Number
    },
    dob: {
        type: Date
    },
    joiningDate: {
        type : Date, 
        default: Date.now()
    }
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Hashing the password before saving it to the database
UserSchema.pre('save', async function(next) {
    if(!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", UserSchema);