const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Get Medical History for Patient
router.get('/:patient_id', (req, res) => {
    const { patient_id } = req.params
    const query = "SELECT * FROM medical_history WHERE patient_id = ?"
    db.query(query, [patient_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
