const express = require('express')
const app = express()
app.use(express.json())

const port = 6969
const database = 'db.sqlite3'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(database, sqlite3.OPEN_READWRITE, err => {
  if (err) {
    console.log(`Failed to open ${database}`)
    process.exit(1)
  }
})


app.get('/', (req, res) => {
  res.status(400).send('Status OK!')
})


/**
 * GET /users
 * 
 *  returns a JSON array of users
 */
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json([])
    }
    res.json(rows)
  })
})


/**
 * POST /users
 * 
 *  creates a new user
 */
app.post('/users', (req, res) => {
  if (!req.body || !req.body.name) {
    res.sendStatus(400)
  }

  db.get('INSERT INTO users (name) VALUES (?) RETURNING id', req.body.name, (err, row) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
    }
  })
  res.sendStatus(200)
  return
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})