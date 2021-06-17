const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL || 'postgres://iszjhuulhfovix:4b05b2acd555bf100e7645390dfe894ac0a41a531345d886034ee2e7b2006968@ec2-3-233-7-12.compute-1.amazonaws.com:5432/dapssiiptcs9pj';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})


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