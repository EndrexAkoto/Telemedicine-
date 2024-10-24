import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

export const fetchPatients = async () => {
    try {
        const response = await axios.get(`${API_URL}/patients`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

// Define the createAppointment function here
export const createAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(`${API_URL}/appointments`, appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};
