import express from 'express';
import data from './data.js';

const app = express(); // Initializes a new instance of an Express App

// Returns a list of products when the user makes a GET request to /api/products
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;

// Starts Server
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
