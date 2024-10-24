import React, { useState, useEffect } from 'react'

function LabTests({ patientId }) {
    const [labResults, setLabResults] = useState([])

    useEffect(() => {
        fetch(`/lab_tests/${patientId}`)
            .then(response => response.json())
            .then(data => setLabResults(data))
    }, [patientId])

    return (
        <div>
            <h1>Lab Test Results</h1>
            <ul>
                {labResults.map((result, index) => (
                    <li key={index}>
                        <strong>Test:</strong> {result.test_type} <br />
                        <strong>Result:</strong> {result.result}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LabTests
