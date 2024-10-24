import React, { useState } from 'react'

function Pharmacy({ patientId, prescriptionId }) {
    const [pharmacyId, setPharmacyId] = useState('')

    const sendToPharmacy = () => {
        fetch('/pharmacy/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ patient_id: patientId, prescription_id: prescriptionId, pharmacy_id: pharmacyId }),
        }).then(response => response.text())
          .then(data => alert(data))
    }

    return (
        <div>
            <h1>Send Prescription to Pharmacy</h1>
            <input 
                type="text" 
                value={pharmacyId} 
                onChange={e => setPharmacyId(e.target.value)} 
                placeholder="Pharmacy ID"
            />
            <button onClick={sendToPharmacy}>Send</button>
        </div>
    )
}

export default Pharmacy
