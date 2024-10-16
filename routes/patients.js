// routes/patients.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Your DB pool file
const router = express.Router();

// Login Patient
router.post('/login', (req, res) => {
  console.log("Login attempt with body:", req.body); // Log incoming request
  const { email, password } = req.body;

  // Find patient by email
  pool.query(
    `SELECT * FROM Patients WHERE email = ?`,
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      const patient = results[0];

      // Check password
      const match = await bcrypt.compare(password, patient.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Successful login
      req.session.patient_id = patient.id;
      res.json({ message: 'Login successful', patient: { id: patient.id, first_name: patient.first_name } });
    }
  );
});

// Registration Patient
router.post('/register', async (req, res) => {
  console.log("Registration attempt with body:", req.body); // Log incoming request
  const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;

  // Validate email and password
  if (!email || !password) {
    console.log("Email and password are required."); // Log validation error
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if the email already exists
  pool.query(`SELECT * FROM Patients WHERE email = ?`, [email], async (err, results) => {
    if (err) {
      console.log("Database error during email check:", err); // Log database error
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      console.log("Email already exists."); // Log if email exists
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert patient into the database
    pool.query(
      `INSERT INTO Patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address],
      (err, results) => {
        if (err) {
          console.log("Database error during insert:", err); // Log error during insert
          return res.status(500).json({ error: 'Database error' });
        }
        console.log("Patient registered successfully with ID:", results.insertId); // Log success
        res.status(201).json({ message: 'Patient registered successfully', patientId: results.insertId });
      }
    );
  });
});


// Logout Patient
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
