const mongoose = require("mongoose");

const relativeSchema = new mongoose.Schema({
    RelativeName: {
        type: String,
    },
   relation:{
    type:String
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
   
    profession:{
        type:String
    },
    ID:{
        type:String
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    addedBy:{
        type: String,
    }

});

const relativeCollection = mongoose.model("relativedatas", relativeSchema);
module.exports = relativeCollection;
