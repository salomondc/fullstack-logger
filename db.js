const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DATABASE_USER ||'postgres',
  host: process.env.DATABASE_URI || 'localhost',
  database: process.env.DATABASE_NAME || 'postgres',
  password: process.env.DATABASE_PW || 'postgres',
  port: process.env.DATABASE_PORT || 5432,
});

async function  createTable() {
  const tableQuery = await pool.query(`SELECT FROM information_schema.tables where table_name = $1`, [process.env.DATABASE_TABLE || 'log_entries'])
  if(tableQuery.rows.length === 0) {
      //table doesn't exist. make it
    await pool.query(
      `CREATE TABLE ${process.env.DATABASE_TABLE || 'log_entries'}(
      id SERIAL PRIMARY KEY,
      "description" TEXT NOT NULL,
      CHECK ("description" <> ''),
      "startAt" TEXT NOT NULL,
      CHECK ("startAt" <> ''),
      "endAt" TEXT NOT NULL,
      CHECK ("endAt" <> ''),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );`
    )
  }
}
createTable();

module.exports = pool;