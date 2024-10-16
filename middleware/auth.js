// middleware/auth.js
const isAuthenticated = (req, res, next) => {
  if (req.session.patient_id) {
    next() // User is authenticated, proceed to the next middleware
  } else {
    res.status(401).json({ error: 'Unauthorized access' }) // User is not authenticated
  }
}

module.exports = isAuthenticated
