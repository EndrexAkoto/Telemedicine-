import React, { useState, useEffect } from 'react'

function AdminDashboard() {
    const [stats, setStats] = useState({})

    useEffect(() => {
        fetch('/admin/stats')
            .then(response => response.json())
            .then(data => setStats(data))
    }, [])

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                <li>Total Users: {stats.total_users}</li>
                <li>Total Appointments: {stats.total_appointments}</li>
            </ul>
        </div>
    )
}

export default AdminDashboard
