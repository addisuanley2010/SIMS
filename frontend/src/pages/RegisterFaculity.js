import React, { useState } from 'react';
import axios from 'axios';
import '../css/RegisterCourse.css';
import { API_URL } from '../api';

const RegisterFaculity = () => {
    const [faculityName, setFaculityName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post( `${API_URL}/register/faculity`, { faculityName });
            setMessage('Faculity registered successfully!');
            setFaculityName('');
        } catch (error) {
            setMessage('Failed to register Faculity.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register New Faculity</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={faculityName} 
                            onChange={(e) => setFaculityName(e.target.value)} 
                            required 
                            className="form-input"
                            placeholder="Enter faculity name"
                        />
                    </div>
                   
                    <button type="submit" className="submit-button">Register Faculity</button>
                </form>
                {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default RegisterFaculity;
