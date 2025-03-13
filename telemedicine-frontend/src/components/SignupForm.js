import React, { useState } from 'react'
import './SignupForm.css' // Add corresponding CSS
import './RightPanel'
import './LeftPanel'
import './Background'


const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // State to toggle confirm password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <form>
      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <div className="input-with-icon">
          <input
            type="text"
            id="fullName"
            className="input-field"
            placeholder="Enter your full name"
            required
          />
          <i className="fa-regular fa-user form-icon"></i>
        </div>
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <div className="input-with-icon">
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="name@example.com"
            required
          />
          <i className="fa-regular fa-envelope form-icon"></i>
        </div>
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-with-icon">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="input-field"
            placeholder="Enter your password"
            required
          />
          <i className="fa-solid fa-lock form-icon"></i>
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="input-with-icon">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className="input-field"
            placeholder="Confirm your password"
            required
          />
          <i className="fa-solid fa-lock form-icon"></i>
          <button
            type="button"
            className="password-toggle"
            onClick={toggleConfirmPasswordVisibility}
          >
            <i className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="form-group">
        <div className="terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I agree to the <a href="">terms and conditions</a> 
          </label>
        </div>
      </div>

      {/* Signup Button */}
      <button type="submit" className="signup-button">Create Account</button>

      {/* Separator */}
      <div className="separator">Or sign up with</div>
    </form>
  )
}

export default SignupForm