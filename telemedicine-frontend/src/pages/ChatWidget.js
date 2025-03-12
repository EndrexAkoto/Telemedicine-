import React from 'react'
import './ChatWidget.css' // Optional: Add styling for the chat widget

const ChatWidget = () => {
  return (
    <div className="chat-widget">
      <button className="chat-button">Chat with Us</button>
      <div className="chat-window">
        <p>Welcome! How can we help you today?</p>
        {/* Add chat functionality here */}
      </div>
    </div>
  )
}

export default ChatWidget