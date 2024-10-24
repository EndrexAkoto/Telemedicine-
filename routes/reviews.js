const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Submit Review
router.post('/submit', (req, res) => {
    const { patient_id, doctor_id, review, rating } = req.body
    const query = "INSERT INTO reviews (patient_id, doctor_id, review, rating) VALUES (?, ?, ?, ?)"
    db.query(query, [patient_id, doctor_id, review, rating], (err, result) => {
        if (err) throw err
        res.status(200).send('Review submitted')
    })
})

// Get Reviews for Doctor
router.get('/:doctor_id', (req, res) => {
    const { doctor_id } = req.params
    const query = "SELECT * FROM reviews WHERE doctor_id = ?"
    db.query(query, [doctor_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
