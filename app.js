// app.js
const express = require('express')
const session = require('express-session')
const pool = require('./db') // Your DB pool file
const patientsRouter = require('./routes/patients') // Import patients routes

const app = express()

// Set up session management
app.use(session({
  secret: 'your-secret-key',  // Replace with a secure key
  resave: false,
  saveUninitialized: true,
}))

app.use(express.json())  // To parse JSON request bodies

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Use patients routes
app.use('/patients', patientsRouter)

// Test the MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message)
  } else {
    console.log('Connected to the MySQL database')
    connection.release()  // Release the connection back to the pool
  }
})

// Route to get all patients
app.get('/patients', (req, res) => {
  pool.query('SELECT * FROM Patients', (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err)
      return res.status(500).json({ error: 'Database error' })
    }
    res.status(200).json(results)
  })
})

// Catch-all for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})