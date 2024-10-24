import React, { useState, useEffect } from 'react'

function Notifications({ userId }) {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch(`/notifications/${userId}`)
            .then(response => response.json())
            .then(data => setNotifications(data))
    }, [userId])

    return (
        <div>
            <h1>Your Notifications</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        <strong>Message:</strong> {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Notifications
