import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import ChatWidget from './pages/ChatWidget'

const HomePage = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Fetch doctors from backend API
    fetch('/api/doctors')
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Failed to load doctors. Please try again later.')
        setLoading(false)
      })
  }, [])

  return (
    <div className={`homepage ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark Mode Toggle */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Header Section */}
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
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero-section">
          <h1>Your Health, Our Care</h1>
          <p>Access quality healthcare from the comfort of your home.</p>
          <div className="hero-buttons">
            <Link to="/appointment" className="appointment-btn">Book an Appointment</Link>
            <Link to="/how-it-works" className="secondary-btn">How It Works</Link>
          </div>
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
            <p>Speak to experienced doctors via secure phone and video calls.</p>
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
            <Link to="/lab_tests/request" className="service-btn">Request a Lab Test</Link>
          </div>
        </div>
      </section>

      {/* Lab Results Section */}
      <section className="lab-results-section" id="lab-results">
        <h2>Your Lab Test Results</h2>
        <Link to="/lab_tests/results" className="lab-results-btn">View Lab Test Results</Link>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section" id="doctors">
        <h2>Meet Our Doctors</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div className="doctor-card" key={doctor.id}>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <Link to={`/reviews/${doctor.id}`} className="review-btn">View Reviews</Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <h2>What Our Patients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"The service was amazing! I got my prescription without leaving my home."</p>
            <p>- Jane Doe</p>
          </div>
          <div className="testimonial-card">
            <p>"The doctors are very professional and caring. Highly recommend!"</p>
            <p>- John Smith</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <h3>1. Sign Up</h3>
            <p>Create an account in just a few steps.</p>
          </div>
          <div className="step-card">
            <h3>2. Choose a Doctor</h3>
            <p>Select from our list of experienced doctors.</p>
          </div>
          <div className="step-card">
            <h3>3. Start Your Consultation</h3>
            <p>Connect via video call or phone call.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-card">
            <h3>How do I book an appointment?</h3>
            <p>Click on "Book an Appointment" and follow the steps to select a doctor and time.</p>
          </div>
          <div className="faq-card">
            <h3>Is my data secure?</h3>
            <p>Yes, we follow strict HIPAA guidelines to protect your data.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="#home">Home</Link>
          <Link to="#about">About Us</Link>
          <Link to="#services">Services</Link>
          <Link to="#doctors">Doctors</Link>
          <Link to="#contact">Contact</Link>
        </div>
        <div className="social-media">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
        <p>© 2025 Telemedicine. All rights reserved.</p>
      </footer>

      {/* Live Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default HomePage