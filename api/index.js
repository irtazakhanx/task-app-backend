const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: 'https://localhost:5173',
  credentials: true 
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Task Manager API basic route');
});

const tasksRouter = require('../routes/tasks');
const usersRouter = require('../routes/users');
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 


module.exports = serverless(app);