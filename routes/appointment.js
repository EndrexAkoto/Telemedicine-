// routes/appointments.js
const express = require('express')
const pool = require('../db')
const isAuthenticated = require('../middleware/auth') // Import the auth middleware
const router = express.Router()

// Book Appointment (Protected Route)
router.post('/book', isAuthenticated, (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body
  const patient_id = req.session.patient_id // Get the patient ID from session

  // Insert appointment into DB
  pool.query(
    `INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status)
    VALUES (?, ?, ?, ?, ?)`,
    [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled'],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' })
      }
      res.status(201).json({ message: 'Appointment booked successfully' })
    }
  )
})

module.exports = router
