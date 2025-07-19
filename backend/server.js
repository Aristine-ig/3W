const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["https://threew-6pdm.onrender.com"],
    // origin: ["http://localhost:5173", "https://threew-6pdm.onrender.com"], // React dev server and production
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: ["https://threew-6pdm.onrender.com"],
  // origin: ["http://localhost:5173", "https://threew-6pdm.onrender.com"],
  credentials: true
}));
app.use(express.json());

// Routes
const usersRouter = require('./routes/users');
const claimRouter = require('./routes/claim');
const historyRouter = require('./routes/history');

app.use('/api/users', usersRouter);
app.use('/api/claim', claimRouter);
app.use('/api/history', historyRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    initializeDefaultUsers();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Initialize default users if they don't exist
async function initializeDefaultUsers() {
  const User = require('./models/User');
  const defaultUsers = [
    'Rahul',
    'Kamal',
    'Sanak',
    'Priya',
    'Amit',
    'Neha',
    'Raj',
    'Sita',
    'Vikram',
    'Anjali'
  ];

  try {
    const existingUsers = await User.find();
    if (existingUsers.length === 0) {
      const usersToCreate = defaultUsers.map(name => ({ name }));
      await User.insertMany(usersToCreate);
      console.log('Default users created successfully');
    }
  } catch (error) {
    console.error('Error initializing default users:', error);
  }
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io available to routes

app.set('io', io);

// Update the claim route to emit real-time updates
const claimRoute = require('./routes/claim');
app.use('/api/claim', (req, res, next) => {
  req.io = io;
  next();
}, claimRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});