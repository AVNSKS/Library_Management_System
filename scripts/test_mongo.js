const mongoose = require('mongoose');

const uri = "mongodb+srv://Library_Management:Siva__2006@cluster0.xkd93dw.mongodb.net/?appName=Cluster0";

console.log('Testing MongoDB connection to:', uri.replace(/:[^@]+@/, ':*****@'));

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error('MongoDB connection error:');
    console.error(err);
    process.exit(1);
  });
