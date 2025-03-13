import React from 'react'
import './LeftPanel.css' // Import the CSS file

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <div className="brand fade-in fade-in-1">
        <div className="logo">CV</div>
        <div className="logo-text">CodingVox</div>
      </div>

      <div className="intro-text fade-in fade-in-2">
        <h1>Seamless access to your digital workspace</h1>
        <p>
          Connect with your team, manage projects, and drive success with our
          intuitive platform.
        </p>
      </div>

      <div className="features fade-in fade-in-3">
        <div className="feature">
          <div className="feature-icon">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div className="feature-text">Enterprise-grade security</div>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fa-solid fa-users-gear"></i>
          </div>
          <div className="feature-text">Real-time collaboration</div>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div className="feature-text">Advanced analytics</div>
        </div>
      </div>

      <div className="footer fade-in fade-in-4">
        <span>© 2025 . All rights reserved.</span>
        <nav>
          <ul>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/help">Help</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default LeftPanel