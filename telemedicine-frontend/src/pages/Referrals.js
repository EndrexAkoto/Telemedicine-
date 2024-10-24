import React, { useState, useEffect } from 'react'

function Referrals({ patientId }) {
    const [referrals, setReferrals] = useState([])

    useEffect(() => {
        fetch(`/referrals/${patientId}`)
            .then(response => response.json())
            .then(data => setReferrals(data))
    }, [patientId])

    return (
        <div>
            <h1>Your Referrals</h1>
            <ul>
                {referrals.map((referral, index) => (
                    <li key={index}>
                        <strong>Referred Doctor ID:</strong> {referral.referred_doctor_id} <br />
                        <strong>Reason:</strong> {referral.reason}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Referrals
