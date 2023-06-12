const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/generateToken")

const registerUser = expressAsyncHandler(async(req, res) => {
    const {email, password, profilePhoto} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error("User already exists. Login")
    }

    const user = await User.create({email, password, profilePhoto});

    // if user has been successfully created in the database
    if(user) {
        res.status(201).json({
            _id: user._id,
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
            email: user.email,
            profilePhoto: user.profilePhoto,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid username or password")
    }
})

module.exports = {registerUser, authUser};
