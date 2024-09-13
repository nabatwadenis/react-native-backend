const mongoose = require('mongoose')

const ChatroomsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "create a chatroom"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})


const Chatrooms = mongoose.model('Chatrooms', ChatroomsSchema);
module.exports = Chatrooms;