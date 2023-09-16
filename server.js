const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.MONGODB_URL;
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messagesRoute');
const socket = require('socket.io');
const http = require('http');
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});


const PORT = process.env.PORT || 8000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);



app.get('/', (req, res) => {
  res.send('Backend is Live.')
})
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Listening to the port number ${PORT}.`);
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});