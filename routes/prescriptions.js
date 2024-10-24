const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Create Prescription
router.post('/create', (req, res) => {
    const { doctor_id, patient_id, prescription_details } = req.body
    const query = "INSERT INTO prescriptions (doctor_id, patient_id, prescription_details) VALUES (?, ?, ?)"
    db.query(query, [doctor_id, patient_id, prescription_details], (err, result) => {
        if (err) throw err
        res.status(200).send('Prescription created')
    })
})

// Get Patient Prescriptions
router.get('/:patient_id', (req, res) => {
    const { patient_id } = req.params
    const query = "SELECT * FROM prescriptions WHERE patient_id = ?"
    db.query(query, [patient_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
