require('dotenv').config({path: '../.env'})
const express = require('express')
const path = require('path')
const cors = require("cors")
const pool = require("./db")
const port = process.env.PORT || 4000;
const app = express()
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.post("/log/create", async(req, res) => {
  try {
    const {description, startAt, endAt} = req.body;
    const newLog = await pool.query(`INSERT INTO ${process.env.DATABASE_TABLE || 'log_entries'} ("description", "startAt", "endAt") VALUES($1, $2, $3) RETURNING *`,
    [description, startAt, endAt]
    );

    res.json(newLog.rows[0]);
  } catch (error) {
    res.send({...error, error:true});
    console.error(error);
  }
})

app.get("/logs", async (req, res) => {
  try {
    const allLogs = await pool.query(`SELECT * FROM ${process.env.DATABASE_TABLE || 'log_entries'}`);
    res.json(allLogs. rows);
  } catch (error) {
    console.error(error);
  }
})

app.listen(port, () => {
  console.log(`Logger server listening at http://localhost:${port}`)
})