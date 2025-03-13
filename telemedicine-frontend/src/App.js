import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage' // Ensure this path is correct
import LoginPage from './components/LoginPage' // Use LoginPage instead of LoginForm
import SignupPage from './components/SignupPage' // Use SignupPage instead of SignupForm

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App