import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRouter = express.Router();

// Sends the list of products to the frontend
productRouter.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);
productRouter.get('/name/:name', async (req, res) => {
  // Checks whether the request product name is in the backend
  // If it exist then the product will be returned otherwise will get an error message
  const product = await Product.findOne({ name: req.params.name });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  // Checks whether the request product id is in the backend
  // If it exist then the product will be returned otherwise will get an error message
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
export default productRouter;
