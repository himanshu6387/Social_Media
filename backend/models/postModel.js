const mongoose = require('mongoose');
const userModel = require('./userModel')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'Title is Required']
    },
    description:{
        type:String,
        require:[true,'Description is Required']
    },
    image:{
        type:String,
        require:[true,'Image is Required']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        require:[true,'User Id is Required'],
    }
},{timestamps:true})

const postModel = mongoose.model('post',postSchema);

module.exports = postModel