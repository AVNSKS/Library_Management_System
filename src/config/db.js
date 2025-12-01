const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Library_Management:Siva__2006@cluster0.xkd93dw.mongodb.net/?appName=Cluster0');

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