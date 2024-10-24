const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Send Prescription to Pharmacy
router.post('/send', (req, res) => {
    const { patient_id, prescription_id, pharmacy_id } = req.body
    const query = "INSERT INTO pharmacy_orders (patient_id, prescription_id, pharmacy_id) VALUES (?, ?, ?)"
    db.query(query, [patient_id, prescription_id, pharmacy_id], (err, result) => {
        if (err) throw err
        res.status(200).send('Prescription sent to pharmacy')
    })
})

module.exports = router
