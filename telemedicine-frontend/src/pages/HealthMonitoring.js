import React, { useState, useEffect } from 'react'

function HealthMonitoring({ userId }) {
    const [healthData, setHealthData] = useState([])

    useEffect(() => {
        fetch(`/health/${userId}`)
            .then(response => response.json())
            .then(data => setHealthData(data))
    }, [userId])

    return (
        <div>
            <h1>Your Health Data</h1>
            <ul>
                {healthData.map((data, index) => (
                    <li key={index}>
                        <strong>Metric:</strong> {data.health_metric} <br />
                        <strong>Value:</strong> {data.value}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HealthMonitoring
