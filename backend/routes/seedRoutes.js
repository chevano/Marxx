import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({}); // Removes all previous records in the Product model
  // Creates an array of product models populated with data from data.js
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default seedRouter;
