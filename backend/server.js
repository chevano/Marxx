import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express(); // Initializes a new instance of an Express App

// Instantiate the database with sample data
app.use('/api/seed', seedRouter);

// Handles all the request Methods that has a starting endpoint of '/api/products'
app.use('/api/products', productRouter);

const port = process.env.PORT || 5000;

// Starts Server
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
