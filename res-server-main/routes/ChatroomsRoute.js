const express = require('express');
const Ad = require('../models/Chatrooms');
const { getAllChatrooms, createChatroom } = require('../controllers/ChatroomsController');

const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));


router.get('/allrooms',getAllChatrooms);
router.post('/createChatroom', createChatroom);

module.exports = router;