const mongoose = require("mongoose");

const userRegistration = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        // unique:true
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    password: {
        type:String,
        required:true
    },
    confirmPassword: {
        type:String,
        required:true
    }
})

// creating collections

const Signup = new mongoose.model("Signup", userRegistration);
module.exports = Signup;