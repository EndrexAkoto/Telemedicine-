const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db') // Assuming you have a db connection file

// Signup Route
router.post('/signup', (req, res) => {
  const { first_name, last_name, email, password } = req.body // Update to use first_name and last_name

  // Check if user already exists
  pool.query('SELECT * FROM Patients WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err)
      return res.status(500).send('Internal server error')
    }

    if (results.length > 0) {
      return res.status(400).send('Email already in use')
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Insert the new user into the database
    pool.query(
      'INSERT INTO Patients (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)', // Update SQL to use first_name and last_name
      [first_name, last_name, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Database insertion error:', err)
          return res.status(500).send('Internal server error')
        }

        res.status(201).send('Signup successful')
      }
    )
  })
})

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body

  pool.query('SELECT * FROM Patients WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err)
      return res.status(500).send('Internal server error')
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid email or password')
    }

    const patient = results[0]
    if (!bcrypt.compareSync(password, patient.password_hash)) {
      return res.status(401).send('Invalid email or password')
    }

    // Set session data
    req.session.patientId = patient.id
    res.send('Logged in successfully')
  })
})

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout failed')
    }
    res.send('Logged out successfully')
  })
})

// Check authentication route
router.get('/check-auth', (req, res) => {
  if (req.session.patientId) {
    res.send('Logged in')
  } else {
    res.status(401).send('Not logged in')
  }
})

module.exports = router
