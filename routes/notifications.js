const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Create Notification
router.post('/create', (req, res) => {
    const { user_id, message } = req.body
    const query = "INSERT INTO notifications (user_id, message) VALUES (?, ?)"
    db.query(query, [user_id, message], (err, result) => {
        if (err) throw err
        res.status(200).send('Notification created')
    })
})

// Get User Notifications
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params
    const query = "SELECT * FROM notifications WHERE user_id = ?"
    db.query(query, [user_id], (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

module.exports = router
