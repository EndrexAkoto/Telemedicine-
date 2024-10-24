import React, { useState, useEffect } from 'react'

function DoctorAvailability({ doctorId }) {
    const [availability, setAvailability] = useState([])

    useEffect(() => {
        fetch(`/availability/${doctorId}`)
            .then(response => response.json())
            .then(data => setAvailability(data))
    }, [doctorId])

    return (
        <div>
            <h1>Your Availability</h1>
            <ul>
                {availability.map((slot, index) => (
                    <li key={index}>
                        <strong>Available Dates:</strong> {slot.available_dates}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DoctorAvailability
