import React, { useState, useEffect } from 'react'
import './HomePage.css'  // Custom CSS

const HomePage = () => {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    // Fetch doctors from backend API
    fetch('/api/doctors') // Replace with your API endpoint
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="homepage">
      <header className="homepage-header">
        <nav className="navbar">
          <div className="logo">Telemedicine</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#doctors">Doctors</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="auth-buttons">
            <a href="/login" className="login-btn">Login</a>
            <a href="/signup" className="signup-btn">Sign Up</a>
          </div>
        </nav>

        <div className="hero-section">
          <h1>Your Health, Our Care</h1>
          <p>Access quality healthcare from the comfort of your home.</p>
          <a href="/appointment" className="appointment-btn">Book an Appointment</a>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section" id="about">
        <h2>About Us</h2>
        <p>We provide quality healthcare services remotely, ensuring you have access to doctors without leaving your home.</p>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Online Consultation</h3>
            <p>Speak to experienced doctors via secure video calls.</p>
          </div>
          <div className="service-card">
            <h3>Health Monitoring</h3>
            <p>Regular monitoring and guidance for your health.</p>
          </div>
          <div className="service-card">
            <h3>Prescriptions</h3>
            <p>Receive your prescriptions online and get them delivered.</p>
          </div>
          <div className="service-card">
            <h3>Lab Test Requests</h3>
            <p>Request lab tests directly from your home.</p>
            <a href="/lab_tests/request" className="service-btn">Request a Lab Test</a>
          </div>
        </div>
      </section>

      {/* Lab Results Section */}
      <section className="lab-results-section" id="lab-results">
        <h2>Your Lab Test Results</h2>
        <a href="/lab_tests/results" className="lab-results-btn">View Lab Test Results</a>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section" id="doctors">
        <h2>Meet Our Doctors</h2>
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <h3>{doctor.first_name} {doctor.last_name}</h3>
              <p>{doctor.specialization}</p>
              <a href={`/reviews/${doctor.id}`} className="review-btn">View Reviews</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Telemedicine. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
