const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/generateToken");
const user = require("../models/user");

const registerUser = expressAsyncHandler(async(req, res) => {
    const {name, email, password, profilePhoto} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error("User already exists. Login")
    }

    const user = await User.create({name, email, password, profilePhoto});

    // if user has been successfully created in the database
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("User registration failed.")
    }
})

const authUser = expressAsyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    
    // If such a user exists in the database 
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid email ID or password")
    }
})

const fetchProfile = expressAsyncHandler(async(req, res) => {
    const {email} = req.params;
    // console.log(`Email: ${email}`);

    const user = await User.findOne({email});
    if(user) {
        return res.json({
            name: user.name,
            joiningDate: user.joiningDate.toLocaleDateString(),
            emergencyContact: user.emergencyContact,
            phoneNumber: user.phoneNumber,
            savedAddress: user.savedAddress,
            dob:user.dob
        })
    } else {
        res.status(400)
        throw new Error("No user found")
    }
})

const editProfile = expressAsyncHandler(async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email})
    // console.log(user)
    let updatedData = {user, ...req.body}
    // console.log(updatedData)
    let userData = await User.findOneAndUpdate({email}, updatedData,
    {
        new: true //return as the updated value of the profile
    });
    
    if(userData) {
        return res.json({
            name: user?.name,
            phoneNumber: user?.phoneNumber,
            savedAddress: user?.savedAddress,
            emergencyContact: user?.emergencyContact,
            dob: user?.dob
        })
    } else {
        res.status(400)
        throw new Error("Invalid email ID")
    }
})
module.exports = {registerUser, authUser, fetchProfile, editProfile};
