import React from 'react'
import Background from '../components/Background'
import LeftPanel from '../components/LeftPanel'
import RightPanel from '../components/RightPanel'
import SignupForm from '../components/SignupForm'
import './SignupPage.css' // Import the CSS file

const SignupPage = () => {
  return (
    <div className="signup-page">
      <Background />
      <LeftPanel />
      <RightPanel>
        <SignupForm />
      </RightPanel>
    </div>
  )
}

export default SignupPage