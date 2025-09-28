const express = require('express');
const { Pool } = require('pg');
const app = express();

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// All requests to /api will be handled by this file.
// Inside this file, the root route '/' corresponds to the public /api route.
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.json({ 
      message: 'Hello from Vercel Backend!', 
      time: result.rows[0].now 
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Could not connect to the database. Please check the DATABASE_URL environment variable in Vercel.' 
    });
  }
});

// Export the Express app for Vercel to use
module.exports = app;
