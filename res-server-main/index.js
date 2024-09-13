const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel')
const Events = require('./models/EventModel')
const Rooms = require('./models/Chatrooms')
const productRoute = require('./routes/ProductRoute');
const shopRoute = require('./routes/ShopRoutes');
const supplierRoute = require('./routes/SupplierRoute');
const adRoute = require('./routes/AdRoute');
const resellerRoute = require('./routes/ResellerRoute');
const categoryRoute = require('./routes/CategoryRoute');
const chatroomsRoute = require('./routes/ChatroomsRoute');
const messageRoute = require('./routes/MessageRoute');
 

require('dotenv').config();


const app = express();

const cors = require('cors');
const Reseller = require('./models/Reseller');


app.use(cors())


//allow json requests to be sent to the server
app.use(express.json())

//allow url encoded for from input
app.use(express.urlencoded({extended:false}))


if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config({
      path:"./.env"
    })
  }


  const port = process.env.PORT;
  const db = process.env.DB_URL;

app.listen(port,(req,res) => {
    console.log(`Server running on port ${port} at ${db}`)
})


// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err.message));
//strict query
mongoose.set('strictQuery', true);



app.use('/api/product', productRoute)
app.use('/api/user', resellerRoute)
app.use('/api/shop',supplierRoute)
app.use('/api/ads',adRoute)
app.use('/api/category',categoryRoute)
app.use('api/chatrooms', chatroomsRoute)
app.use("/api/messages", messageRoute);

app.get('/',(req,res)=>{
    res.send('Server started')
})

app.get('/productlist',async (req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
        
    } catch (error) {
        console.log('error fetching');
        res.status(500).json({message: error.message});
        
    }
})
app.get('/allrooms', async (req, res) =>{
  try{
    const rooms = await Rooms.find({});
    res.status(200).json(rooms)
  }catch (error) {
    console.log('error fetching');
    res.status(500).json({message: error.message});
    
}
app.post('/createroom', async (req, res) =>{
  const {title } = req.body;
  if (title && title.trim()) {
    // Create new room object
    const newRoom = { id: Rooms.length + 1, name: title.trim()};

    // Add new room to the list (replace with database logic in production)
    rooms.push(newRoom);

    // Send response with the created room
    res.status(201).json(newRoom);

    // Optionally broadcast the new room to all connected clients
    io.emit('newRoom', newRoom);
  } else {
    res.status(400).json({ message: 'Invalid room name' });
  }
})

})
app.get("users/:userId", async(req, res) => {
  try{
    const userId = req.params.userId
    const users = await Reseller.find({_id: {$ne:userId}});
    res.json(users)
  } catch(error){
    console.log("Error", error)
  }
})

app.post("/sendrequest", async(req,res) => {
  const { senderId, recieverId, message} = req.body;
  const reciever = await Reseller.findById(recieverId)
  if(!reciever){
    return res.status(404).json({message:"Reciever not found "});
  };

  reciever.requests.push({from:senderId,message })
  await reciever.save();
  
  res.status(200).json({message:"Request sent sucessfully"})


})

