const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    role:{
        type:String,
        enum:["LIBRARIAN","STUDENT"],
        default:"STUDENT"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
});

module.exports = mongoose.model('User', userSchema);