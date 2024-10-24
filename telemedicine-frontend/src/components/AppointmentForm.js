import React, { useState } from 'react';
import { createAppointment } from '../api'; // You'll create this function in api.js

const AppointmentForm = () => {
    const [formData, setFormData] = useState({ patientId: '', doctorId: '', date: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAppointment(formData);
            // Optionally, reset form or show success message
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="patientId" placeholder="Patient ID" onChange={handleChange} required />
            <input type="text" name="doctorId" placeholder="Doctor ID" onChange={handleChange} required />
            <input type="date" name="date" onChange={handleChange} required />
            <button type="submit">Create Appointment</button>
            {error && <div>Error: {error}</div>}
        </form>
    );
};

export default AppointmentForm;
