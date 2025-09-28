const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

// Use CORS to allow requests from other domains
app.use(cors());

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// All requests to this project will be handled by this file.
// The root route '/' will be the main endpoint.
app.get('/', async (req, res) => {
  res.send('This is the backend API for the Math Game.');
});

app.get('/api', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.json({ 
      message: 'Hello from the separate Vercel backend!', 
      time: result.rows[0].now 
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Could not connect to the database. Please check the DATABASE_URL environment variable.' 
    });
  }
});

// Export the Express app for Vercel to use
module.exports = app;