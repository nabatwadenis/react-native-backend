const express = require('express');
const mongoose = require('mongoose');
const http = require("http").createServer(express);
const io = require("socket.io")(http);

require('dotenv').config();


const app = express();

const cors = require('cors');


app.use(cors())


//allow json requests to be sent to the server
app.use(express.json())

//allow url encoded for from input
app.use(express.urlencoded({ extended: false }))


if (process.env.NODE_ENV !== 'PRODUCTION') {
  require("dotenv").config({
    path: "./.env"
  })
}


const port = process.env.PORT;
const db = process.env.DB_URL;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`)
})

mongoose.connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.get('/', (req, res) => {
  res.send('Server started')
})




  // socket.on('joinRoom', async (roomName) => {
  //   try {
  //     const messages = await Chatrooms.find({ name: roomName });
  //     socket.emit('loadMessages', messages);
  //   } catch (error) {
  //     console.error('Error loading messages:', error);
  //   }
  // });






const Reseller = require("./models/Reseller");
const Chatrooms = require('./models/Chatrooms');
const { createChatroom } = require('./controllers/ChatroomsController');

