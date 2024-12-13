const pool = require('./index');

async function createTables(pool) {
  try {

    const createTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTable);
    console.log('Tables created successfully');

  } catch (err) {
    console.error('Error creating tables:', err);
  }
}

module.exports = createTables;
