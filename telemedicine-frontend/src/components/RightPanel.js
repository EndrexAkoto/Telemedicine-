import React, { useState, useRef, useEffect } from 'react'
import LoginForm from './LoginForm'
import SocialLogin from './SocialLogin'
import './RightPanel.css' // Import the CSS file

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('email') // State to track active tab
  const tabBgRef = useRef(null) // Ref for the tab background element

  // Handle tab click
  const handleTabClick = (tab, event) => {
    setActiveTab(tab)
    const tabElement = event.target
    const tabBg = tabBgRef.current

    // Update tab background position and width
    if (tabBg) {
      tabBg.style.left = `${tabElement.offsetLeft}px`
      tabBg.style.width = `${tabElement.offsetWidth}px`
    }
  }

  // Set initial position of tab background on component mount
  useEffect(() => {
    const activeTabElement = document.querySelector('.tab.active')
    const tabBg = tabBgRef.current

    if (activeTabElement && tabBg) {
      tabBg.style.left = `${activeTabElement.offsetLeft}px`
      tabBg.style.width = `${activeTabElement.offsetWidth}px`
    }
  }, [])

  return (
    <div className="right-panel">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Login tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'email' ? 'active' : ''}`}
            onClick={(e) => handleTabClick('email', e)}
          >
            Email
          </button>
          <button
            className={`tab ${activeTab === 'phone' ? 'active' : ''}`}
            onClick={(e) => handleTabClick('phone', e)}
          >
            Phone
          </button>
          <div className="tab-bg" ref={tabBgRef}></div>
        </div>

        {/* Login form */}
        <LoginForm />

        {/* Social login */}
        <SocialLogin />
      </div>
    </div>
  )
}

export default RightPanel