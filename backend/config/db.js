const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
         console.log('MongoDB Connected!');
    } catch (error) {
        console.log('Error in Connecting DB')
    }
}

module.exports = connectDB
