const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Create Referral
router.post('/create', (req, res) => {
    const { referring_doctor_id, referred_doctor_id, patient_id, reason } = req.body
    const query = "INSERT INTO referrals (referring_doctor_id, referred_doctor_id, patient_id, reason) VALUES (?, ?, ?, ?)"
    db.query(query, [referring_doctor_id, referred_doctor_id, patient_id, reason], (err, result) => {
        if (err) throw err
        res.status(200).send('Referral created')
    })
})

// Get Referrals for Patient
router.get('/:patient_id', (req, res) => {
    const { patient_id } = req.params
    const query = "SELECT * FROM referrals WHERE patient_id = ?"
    db.query(query, [patient_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
