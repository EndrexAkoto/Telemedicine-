import React, { useState, useEffect } from 'react'

function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    let socket

    useEffect(() => {
        socket = new WebSocket('ws://localhost:8080')
        socket.onmessage = (event) => {
            setMessages(prevMessages => [...prevMessages, event.data])
        }
    }, [])

    const sendMessage = () => {
        socket.send(message)
        setMessage('')
    }

    return (
        <div>
            <h1>Chat</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat
