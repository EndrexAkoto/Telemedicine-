const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Request Lab Test
router.post('/request', (req, res) => {
    const { patient_id, test_type, doctor_id } = req.body
    const query = "INSERT INTO lab_tests (patient_id, test_type, doctor_id) VALUES (?, ?, ?)"
    db.query(query, [patient_id, test_type, doctor_id], (err, result) => {
        if (err) throw err
        res.status(200).send('Lab test requested')
    })
})

// Get Lab Results
router.get('/:patient_id', (req, res) => {
    const { patient_id } = req.params
    const query = "SELECT * FROM lab_results WHERE patient_id = ?"
    db.query(query, [patient_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
