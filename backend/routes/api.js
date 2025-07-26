const express = require('express');
const router = express.Router();
const { readCSV } = require('../utils/csvReader');

// Top 5 most sold products
router.get('/top-products', async (req, res) => {
  try {
    const sales = await readCSV('./data/sales.csv');
    const products = await readCSV('./data/products.csv');
    const productSales = sales.reduce((acc, sale) => {
      acc[sale.product_id] = (acc[sale.product_id] || 0) + parseInt(sale.quantity);
      return acc;
    }, {});
    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, quantity]) => ({
        product: products.find(p => p.id === id),
        quantity
      }));
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top products' });
  }
});

// Order status by ID
router.get('/order/:id', async (req, res) => {
  try {
    const orders = await readCSV('./data/orders.csv');
    const order = orders.find(o => o.id === req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Stock check for Classic T-Shirt
router.get('/stock/:productName', async (req, res) => {
  try {
    const products = await readCSV('./data/products.csv');
    const product = products.find(p => p.name.toLowerCase() === req.params.productName.toLowerCase());
    if (product) {
      res.json({ name: product.name, stock: product.stock });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
});

module.exports = router;