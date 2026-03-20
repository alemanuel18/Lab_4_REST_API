const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function initDB() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id      SERIAL PRIMARY KEY,
      campo1  TEXT    NOT NULL,
      campo2  TEXT    NOT NULL,
      campo3  TEXT    NOT NULL,
      campo4  INTEGER NOT NULL,
      campo5  REAL    NOT NULL,
      campo6  BOOLEAN NOT NULL
    )
  `);
}

module.exports = { pool, initDB };