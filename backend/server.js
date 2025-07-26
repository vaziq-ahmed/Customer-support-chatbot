const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config(); // If using .env for configs

const db = new sqlite3.Database(':memory:'); // Or 'ecommerce.db' for persistence
require('./loadData.js'); // Load data before starting server

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
