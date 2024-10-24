const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find admin by username
  pool.query(
    `SELECT * FROM Admin WHERE username = ?`,
    [username],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      const admin = results[0];
      const match = await bcrypt.compare(password, admin.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Successful login
      req.session.admin_id = admin.id;
      res.json({ message: 'Login successful', admin: { id: admin.id, username: admin.username } });
    }
  );
});

// Add Doctor
router.post('/doctor', (req, res) => {
  const { first_name, last_name, specialization, email, phone, schedule } = req.body;

  pool.query(
    'INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)', 
    [first_name, last_name, specialization, email, phone, schedule], 
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error adding doctor' });
      res.json({ message: 'Doctor added successfully' });
    }
  );
});

// Get All Doctors
router.get('/doctors', (req, res) => {
  pool.query('SELECT * FROM Doctors', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving doctors' });
    res.json(results);
  });
});

// Get Doctor by ID
router.get('/doctor/:id', (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM Doctors WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving doctor' });
    if (results.length === 0) return res.status(404).json({ error: 'Doctor not found' });
    
    res.json(results[0]); // Return the doctor details
  });
});

// Update Doctor
router.put('/doctor/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, specialization, email, phone, schedule } = req.body;

  pool.query(
    'UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? WHERE id = ?', 
    [first_name, last_name, specialization, email, phone, schedule, id], 
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error updating doctor' });
      res.json({ message: 'Doctor updated successfully' });
    }
  );
});

// Delete Doctor
router.delete('/doctor/:id', (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM Doctors WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error deleting doctor' });
    res.json({ message: 'Doctor deleted successfully' });
  });
});

// Create Appointment
router.post('/appointment', (req, res) => {
  const { patient_id, doctor_id, date, time, status } = req.body;

  pool.query(
    'INSERT INTO Appointments (patient_id, doctor_id, date, time, status) VALUES (?, ?, ?, ?, ?)',
    [patient_id, doctor_id, date, time, status],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error creating appointment' });
      res.json({ message: 'Appointment created successfully' });
    }
  );
});

// Get All Appointments
router.get('/appointments', (req, res) => {
  pool.query('SELECT * FROM Appointments', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving appointments' });
    res.json(results);
  });
});

// Update Appointment
router.put('/appointment/:id', (req, res) => {
  const { id } = req.params;
  const { patient_id, doctor_id, date, time, status } = req.body;

  pool.query(
    'UPDATE Appointments SET patient_id = ?, doctor_id = ?, date = ?, time = ?, status = ? WHERE id = ?',
    [patient_id, doctor_id, date, time, status, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error updating appointment' });
      res.json({ message: 'Appointment updated successfully' });
    }
  );
});

// Delete Appointment
router.delete('/appointment/:id', (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM Appointments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error deleting appointment' });
    res.json({ message: 'Appointment deleted successfully' });
  });
});

// Patient Registration
router.post('/register', (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;

  const password_hash = bcrypt.hashSync(password, 10);

  pool.query(
    'INSERT INTO Patients (first_name, last_name, email, password_hash, phone) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, email, password_hash, phone],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error registering patient' });
      res.json({ message: 'Patient registered successfully' });
    }
  );
});

// Patient Login
router.post('/patient/login', async (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM Patients WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Patient not found' });

    const patient = results[0];
    const match = await bcrypt.compare(password, patient.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    req.session.patient_id = patient.id;
    res.json({ message: 'Login successful', patient: { id: patient.id, first_name: patient.first_name } });
  });
});

// Update Patient Profile
router.put('/patient/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone } = req.body;

  pool.query(
    'UPDATE Patients SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?',
    [first_name, last_name, email, phone, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error updating patient profile' });
      res.json({ message: 'Patient profile updated successfully' });
    }
  );
});

// Admin Functionality: View All Patients
router.get('/patients', (req, res) => {
  pool.query('SELECT * FROM Patients', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving patients' });
    res.json(results);
  });
});

// New Features

// Lab Test Requests
router.post('/lab_tests/request', (req, res) => {
  const { patient_id, test_type, doctor_id } = req.body;

  pool.query(
    'INSERT INTO lab_tests (patient_id, test_type, doctor_id) VALUES (?, ?, ?)',
    [patient_id, test_type, doctor_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error requesting lab test' });
      res.json({ message: 'Lab test requested successfully' });
    }
  );
});

// Get Lab Test Results for a Patient
router.get('/lab_tests/:patient_id', (req, res) => {
  const { patient_id } = req.params;

  pool.query('SELECT * FROM lab_results WHERE patient_id = ?', [patient_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving lab results' });
    res.json(results);
  });
});

// Submit Review
router.post('/reviews/submit', (req, res) => {
  const { patient_id, doctor_id, review, rating } = req.body;

  pool.query(
    'INSERT INTO reviews (patient_id, doctor_id, review, rating) VALUES (?, ?, ?, ?)',
    [patient_id, doctor_id, review, rating],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error submitting review' });
      res.json({ message: 'Review submitted successfully' });
    }
  );
});

// Get Reviews for a Doctor
router.get('/reviews/:doctor_id', (req, res) => {
  const { doctor_id } = req.params;

  pool.query('SELECT * FROM reviews WHERE doctor_id = ?', [doctor_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving reviews' });
    res.json(results);
  });
});

module.exports = router;
