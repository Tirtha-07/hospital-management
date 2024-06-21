const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    
    DoctorName: {
        type: String,
    },
    DoctorOfType: {
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
    degree:{
        type: String
    },
    yearsOfExperience:{
        type: Number
    },
    ID:{
        type: String,
        
    },
    AvailableHrs:{
        type: String
    },
    AvailableDays:{
        type: String
    },
    password:{
        type: String,
        unique: true,
        required: true
    },
    addedBy:{
        type: String,
    }
});



const doctorCollection = mongoose.model("doctordatas", doctorSchema);
module.exports = doctorCollection;


