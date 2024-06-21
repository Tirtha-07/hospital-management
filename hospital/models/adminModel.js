const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    AdminName: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
    },
    ph_no: {
        type: String
    },
    address:{
        type: String
    },
    state:{
        type: String
    },
    pin:{
        type: Number
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    AdminId:{
        type: String,
    },
    verificationCode:{
        type: String,
    },
    verificationCodeExp:{
        type:Number,
    }
});



const adminCollection = mongoose.model("admindatas", adminSchema);
module.exports = adminCollection;

