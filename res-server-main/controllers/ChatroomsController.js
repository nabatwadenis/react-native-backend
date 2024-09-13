const express = require('express')
const Rooms = require("../models/Chatrooms")


//query all chatrooms

const getAllChatrooms = async(req,res)=>{
    try {
        const rooms = await Rooms.find({}).sort({ createdAt: -1});
        res.status(200).json(rooms);        
    } catch (error) {
        console.log("no rooms found");
        res.status(500).json({message: error})
    }
}

const createChatroom = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the room already exists
        const existingUser = await Rooms.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'chatroom already exists' });
        }

        // Create a new user
        const room = await Rooms.create({
            title,
            createdAt
        });

        res.status(200).json(user);
        console.log('chatroom created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getAllChatrooms,
  createChatroom,
}