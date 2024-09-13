const express = require('express');
const  getMessages = require ("../controllers/MessageController.js");
const sendMessage  = require ("../controllers/MessageController.js");

const router = express.Router();

router.get("/:id", protectRoute, getMessages.getMessages);
router.post("/send/:id", sendMessage.sendMessage);

module.exports=  router;