import React, { useState, useEffect } from 'react'

function MedicalHistory({ patientId }) {
    const [history, setHistory] = useState([])

    useEffect(() => {
        fetch(`/history/${patientId}`)
            .then(response => response.json())
            .then(data => setHistory(data))
    }, [patientId])

    return (
        <div>
            <h1>Your Medical History</h1>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        <strong>Date:</strong> {entry.date} <br />
                        <strong>Details:</strong> {entry.details}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MedicalHistory
