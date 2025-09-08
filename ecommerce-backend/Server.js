require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.log('Error connecting to MongoDB: ' + err));

// Routes add karo (neeche bataya jayega)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`));