const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
    NurseName: {
        type: String,
    },
    ServingDepartment: {
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
    address: {
        type: String
    },
   
    dateOfJoining:{
        type:String
    },
    experience:{
        type:Number
    },
    ServingUnder: {
        type:String
    },
    password:{
        type:String,
        required:true,
        Uint16Array
    },
    addedBy:{
        type: String,
    },
    ID:{
        type:String,
    }

});

const nurseCollection = mongoose.model("nursedatas", nurseSchema);
module.exports = nurseCollection;
