import React, { useState, useEffect } from 'react'

function MedicalRecords({ patientId }) {
    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch(`/records/${patientId}`)
            .then(response => response.json())
            .then(data => setRecords(data))
    }, [patientId])

    return (
        <div>
            <h1>Medical Records</h1>
            <ul>
                {records.map((record, index) => (
                    <li key={index}>
                        <strong>Record:</strong> {record.record_details}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MedicalRecords
