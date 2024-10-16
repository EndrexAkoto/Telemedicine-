// routes/auth.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const pool = require('../db')  // assuming you have a db connection file

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body

  pool.query('SELECT * FROM Patients WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send('Invalid email or password')
    }

    const patient = results[0]
    if (!bcrypt.compareSync(password, patient.password_hash)) {
      return res.status(400).send('Invalid email or password')
    }

    req.session.patientId = patient.id
    res.send('Logged in successfully')
  })
})

module.exports = router
