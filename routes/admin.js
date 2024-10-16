app.post('/admin/doctor', (req, res) => {
  const { first_name, last_name, specialization, email, phone, schedule } = req.body

  pool.query('INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)', 
    [first_name, last_name, specialization, email, phone, schedule], 
    (err, results) => {
      if (err) return res.status(500).send('Error adding doctor')
      res.send('Doctor added successfully')
  })
})
