// routes/appointment.js
const express = require('express')
const pool = require('../db')
const isAuthenticated = require('../middleware/auth') // Import the auth middleware
const router = express.Router()

// Book Appointment (Protected Route)
router.post('/book', isAuthenticated, (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body
  const patient_id = req.session.patient_id

  pool.query(
    `INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status)
     VALUES (?, ?, ?, ?, ?)`,  // Corrected table name to "Appointments"
    [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled'],
    (err, results) => {
      if (err) {
        console.error('Error booking appointment:', err)  // Log full error details
        return res.status(500).json({ error: 'Database error' })
      }
      res.status(201).json({ message: 'Appointment booked successfully', appointmentId: results.insertId })
    }
  )
})

// View All Appointments (Protected Route)
router.get('/', isAuthenticated, (req, res) => {
  const patient_id = req.session.patient_id // Get the patient ID from session

  // Get all appointments for the patient
  pool.query(
    `SELECT * FROM Appointments WHERE patient_id = ?`,  // Corrected table name to "Appointments"
    [patient_id],
    (err, results) => {
      if (err) {
        console.error('Error fetching appointments', err) // Log error for debugging
        return res.status(500).json({ error: 'Database error' })
      }
      res.status(200).json(results) // Return the list of appointments
    }
  )
})

// Update Appointment Status (Protected Route)
router.put('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params
  const { status } = req.body

  // Update the status of the appointment
  pool.query(
    `UPDATE Appointments SET status = ? WHERE id = ?`,  // Corrected table name to "Appointments"
    [status, id],
    (err, results) => {
      if (err) {
        console.error('Error updating appointment status:', err) // Log error for debugging
        return res.status(500).json({ error: 'Database error' })
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Appointment not found' })
      }
      res.json({ message: 'Appointment status updated successfully' })
    }
  )
})

// Delete Appointment (Protected Route)
router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params

  // Delete the appointment
  pool.query(
    `DELETE FROM Appointments WHERE id = ?`,  // Corrected table name to "Appointments"
    [id],
    (err, results) => {
      if (err) {
        console.error('Error deleting appointment:', err) // Log error for debugging
        return res.status(500).json({ error: 'Database error' })
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Appointment not found' })
      }
      res.json({ message: 'Appointment deleted successfully' })
    }
  )
})

module.exports = router
