const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    PatientName: {
        type: String,
    },
    PatientOfType: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    ph_no: {
        type: String
    },
    address: {
        type: String
    },
   
    doa:{
        type:String
    },
    dod:{
        type:String
    },
    doctorId: {
        type: mongoose.Types.ObjectId
        // ref: "doctordatas"
    },
    relativeId:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    addedBy:{
        type: String,
    },
    ID:{
        type:String
    }


});

const patientCollection = mongoose.model("patientdatas", patientSchema);
module.exports = patientCollection;
