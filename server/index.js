
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3001;

// Setup database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/', (req, res) => {
  res.send('Hello From Express Backend!');
});

app.get('/api', async (req, res) => {
  try {
    const client = await pool.connect();
    // Simple query to test connection
    const result = await client.query('SELECT NOW()');
    client.release();
    res.json({ 
      message: 'Hello from the backend!', 
      time: result.rows[0].now 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
