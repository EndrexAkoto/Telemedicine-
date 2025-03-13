import React from 'react'
import './SocialLogin.css' // Import the CSS file

const SocialLogin = () => {
  return (
    <div className="social-login">
      <div className="social-btn">
        <i className="fa-brands fa-google"></i>
      </div>
      <div className="social-btn">
        <i className="fa-brands fa-github"></i>
      </div>
      <div className="social-btn">
        <i className="fa-brands fa-linkedin-in"></i>
      </div>
      <div className="signup-link">
        Don't have an account? <a href="/signup">Create account</a>
      </div>
    </div>
  )
}

export default SocialLogin