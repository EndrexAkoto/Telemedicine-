import React, { useState, useEffect } from 'react'

function Prescriptions({ patientId }) {
    const [prescriptions, setPrescriptions] = useState([])

    useEffect(() => {
        fetch(`/prescriptions/${patientId}`)
            .then(response => response.json())
            .then(data => setPrescriptions(data))
    }, [patientId])

    return (
        <div>
            <h1>Your Prescriptions</h1>
            <ul>
                {prescriptions.map((prescription, index) => (
                    <li key={index}>
                        <strong>Doctor ID:</strong> {prescription.doctor_id} <br />
                        <strong>Details:</strong> {prescription.prescription_details}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Prescriptions
