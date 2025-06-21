const mongoose = require('mongoose');
const postModel = require('./postModel')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'UserName is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required..']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
  
}, { timestamps: true });

userSchema.add({
    post: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'posts',
            require: [true, 'Post Id is Required..']
        }
    ]
})
const userModel = mongoose.model('users', userSchema);

module.exports = userModel