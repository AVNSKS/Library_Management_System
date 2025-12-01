const mongoose=require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    author: {
        type: String,
        required: true,
        
    },
    publishedYear: {
        type: Number,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
        
    },
    quantity: {
        type: Number,
        required: true,
       
    },
    status: {
        type: String,
        enum: ['available', 'not available'],
        default: 'available'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);