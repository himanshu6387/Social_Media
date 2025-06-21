const express = require('express');
const { getAllUser } = require('../controllers/userController');
const { createUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');
const router = express.Router();


router.get('/getAllUser',getAllUser);
router.post('/register',createUser)
router.post('/login',loginUser)

module.exports = router