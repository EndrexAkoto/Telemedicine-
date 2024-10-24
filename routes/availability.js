const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Set Doctor Availability
router.post('/set', (req, res) => {
    const { doctor_id, available_dates } = req.body
    const query = "INSERT INTO availability (doctor_id, available_dates) VALUES (?, ?) ON DUPLICATE KEY UPDATE available_dates = VALUES(available_dates)"
    db.query(query, [doctor_id, available_dates], (err, result) => {
        if (err) throw err
        res.status(200).send('Availability set')
    })
})

// Get Doctor Availability
router.get('/:doctor_id', (req, res) => {
    const { doctor_id } = req.params
    const query = "SELECT * FROM availability WHERE doctor_id = ?"
    db.query(query, [doctor_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
