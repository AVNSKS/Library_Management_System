const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/library-managemant-api');

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('DataBases Connected');
})

db.on('disconnect',()=>{
    console.log('DataBases DisConnected');
})

db.on('error',(error)=>{
    console.log('Database Error:', error);
})

module.exports=db;