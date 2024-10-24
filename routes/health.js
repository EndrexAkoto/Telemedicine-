const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Add Health Data
router.post('/add', (req, res) => {
    const { user_id, health_metric, value } = req.body
    const query = "INSERT INTO health_data (user_id, health_metric, value) VALUES (?, ?, ?)"
    db.query(query, [user_id, health_metric, value], (err, result) => {
        if (err) throw err
        res.status(200).send('Health data added')
    })
})

// Get User Health Data
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params
    const query = "SELECT * FROM health_data WHERE user_id = ?"
    db.query(query, [user_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
