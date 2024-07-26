require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI; // MongoDB connection string

mongoose.connect(dbUri)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
