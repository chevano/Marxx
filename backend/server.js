import express from 'express';
import data from './data.js';

const app = express(); // Initializes a new instance of an Express App

// Returns a list of products when the user makes a GET request to /api/products
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/name/:name', (req, res) => {
  // Checks whether the request product name is in the backend
  // If it exist then the product will be returned otherwise will get an error message
  const product = data.products.find((x) => x.name === req.params.name);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get('/api/products/:id', (req, res) => {
  // Checks whether the request product id is in the backend
  // If it exist then the product will be returned otherwise will get an error message
  const product = data.products.find((x) => x._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const port = process.env.PORT || 5000;

// Starts Server
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
