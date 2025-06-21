const express = require('express');
const { getAllPost, createPost, updatePost, deletePost, getPostById } = require('../controllers/postController');
const router = express.Router();

//Routes

router.get('/getAll-Post', getAllPost)
router.post('/create-Post',createPost)
router.put('/update-Post/:id',updatePost)
router.delete('/delete-Post/:id',deletePost)
router.get('/getPost/:id',getPostById)


module.exports = router