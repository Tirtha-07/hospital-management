const mongoose= require('mongoose');

const noteSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usercollections',
        required: true
    }
})

const noteCollection= mongoose.model('notecollections', noteSchema);
module.exports = noteCollection; 