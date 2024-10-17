const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Use your existing database connection
const router = express.Router();

// CREATE: Add a new doctor
router.post('/', (req, res) => {
  const { first_name, last_name, specialization, email, phone, schedule } = req.body;

  // SQL query to insert new doctor
  const query = 'INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(query, [first_name, last_name, specialization, email, phone, schedule], (err, results) => {
    if (err) {
      console.error('Error inserting doctor:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Doctor added successfully', doctorId: results.insertId });
  });
});

// READ: Get a list of all doctors
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Doctors';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// READ: Get a doctor by ID
router.get('/:id', (req, res) => {
  const doctorId = req.params.id;

  const query = 'SELECT * FROM Doctors WHERE id = ?';
  pool.query(query, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching doctor:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(results[0]); // Return the doctor details
  });
});

// UPDATE: Update a doctor's profile or schedule
router.put('/:id', (req, res) => {
  const doctorId = req.params.id;
  const { first_name, last_name, specialization, email, phone, schedule } = req.body;

  // SQL query to update doctor
  const query = 'UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? WHERE id = ?';
  pool.query(query, [first_name, last_name, specialization, email, phone, schedule, doctorId], (err, results) => {
    if (err) {
      console.error('Error updating doctor:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor updated successfully' });
  });
});

// DELETE: Remove or deactivate a doctor
router.delete('/:id', (req, res) => {
  const doctorId = req.params.id;

  // SQL query to delete (or you can deactivate) a doctor
  const query = 'DELETE FROM Doctors WHERE id = ?';
  pool.query(query, [doctorId], (err, results) => {
    if (err) {
      console.error('Error deleting doctor:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
});

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find admin by username
  pool.query(
    'SELECT * FROM Admin WHERE username = ?',
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

// Patient Registration
router.post('/register', (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;

  const password_hash = bcrypt.hashSync(password, 10);

  pool.query(
    'INSERT INTO Patients (first_name, last_name, email, password_hash, phone) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, email, password_hash, phone],
    (err, results) => {
      if (err) return res.status(500).send('Error registering patient');
      res.send('Patient registered successfully');
    }
  );
});

// Patient Login
router.post('/patient/login', async (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM Patients WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('Patient not found');

    const patient = results[0];
    const match = await bcrypt.compare(password, patient.password_hash);
    if (!match) return res.status(401).send('Invalid credentials');

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
      if (err) return res.status(500).send('Error updating patient profile');
      res.send('Patient profile updated successfully');
    }
  );
});

// Admin Functionality: View All Patients
router.get('/patients', (req, res) => {
  pool.query('SELECT * FROM Patients', (err, results) => {
    if (err) return res.status(500).send('Error retrieving patients');
    res.json(results);
  });
});

module.exports = router;
