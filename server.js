const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.MONGODB_URL;
const userRoutes = require('./routes/userRoutes')

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log(err);
  });
  

const PORT = process.env.PORT || 5000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/auth',userRoutes);

app.get('/',(req,res)=>{
    res.send('Backend is Live.')
})

app.listen(PORT,()=>{
    console.log(`Listening to the port number ${PORT}.`);
})