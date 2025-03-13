import React from 'react'
import './Background.css' // Import the CSS file

const Background = () => {
  return (
    <div className="background">
      <div className="noise"></div>
      <div className="grid"></div>
      <div className="gradient-sphere sphere-1"></div>
      <div className="gradient-sphere sphere-2"></div>
    </div>
  )
}

export default Background