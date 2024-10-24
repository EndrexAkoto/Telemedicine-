const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Upload or Update Medical Record
router.post('/upload', (req, res) => {
    const { patient_id, record_details } = req.body
    const query = "INSERT INTO medical_records (patient_id, record_details) VALUES (?, ?) ON DUPLICATE KEY UPDATE record_details = VALUES(record_details)"
    db.query(query, [patient_id, record_details], (err, result) => {
        if (err) throw err
        res.status(200).send('Record uploaded/updated')
    })
})

// Get Patient Records
router.get('/:patient_id', (req, res) => {
    const { patient_id } = req.params
    const query = "SELECT * FROM medical_records WHERE patient_id = ?"
    db.query(query, [patient_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
