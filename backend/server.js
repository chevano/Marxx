import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Instantiate the database with sample data
app.use('/api/seed', seedRouter);

// Handles all the request Methods that has a starting endpoint of '/api/products' using productRouter
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Handles the errors that occurs in the expressAsyncHandler function which can be found in userRoutes.js
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

// Starts Server
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
