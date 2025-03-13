import React from 'react'
import Background from './Background'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import './LoginPage.css' // Import the CSS file

const LoginPage = () => {
  return (
    <div className="login-page">
      <Background />
      <LeftPanel />
      <RightPanel />
    </div>
  )
}

export default LoginPage