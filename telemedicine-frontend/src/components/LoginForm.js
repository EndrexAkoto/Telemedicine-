import React, { useState } from 'react'
import './LoginForm.css' // Import the CSS file

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form>
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

      <div className="form-extras">
        <div className="remember-me">
          <input type="checkbox" id="remember" defaultChecked />
          <label htmlFor="remember">Remember me</label>
        </div>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>

      <button type="submit" className="login-button">Sign In</button>

      <div className="separator">Or continue with</div>
    </form>
  )
}

export default LoginForm