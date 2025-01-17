import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/RegisterCourse.css';
import { API_URL } from '../api';

const RegisterDepartment = () => {
    const [faculityId, setfaculityId] = useState('');
    const [departmentName, setdepartmentName] = useState('');
    const [message, setMessage] = useState('');
    const [faculities, setfaculities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const faculitiesResponse = await axios.get( `${API_URL}/display/faculity`);
                setfaculities(faculitiesResponse.data);
            } catch (error) {
                setMessage('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post( `${API_URL}/register/department`, { faculityId, departmentName });
            setMessage('Registration successful!');
            setfaculityId('');
            setdepartmentName('');
        } catch (error) {
            setMessage('faculity is already registered for this course!');
        }
    };

    return (
        <div className="enroll-container">
            <div className="enroll-card">
                <h2 className="enroll-title">Enroll faculity in Course</h2>
                <form onSubmit={handleSubmit} className="enroll-form">
                    <div className="form-group">

                    <div className="form-group">
                            <label>Department Name :</label>
                            <input 
                                type="text" 
                                value={departmentName} 
                                onChange={(e) => setdepartmentName(e.target.value)} 
                                required 
                                className="form-input"
                            />
                        </div>
                   


                        <label>Faculity:</label>
                        <select 
                            value={faculityId} 
                            onChange={(e) => setfaculityId(e.target.value)}
                            required
                            className="form-select"
                        >
                            <option value="">Select Faculity</option>
                            {faculities.map(faculity => (
                                <option key={faculity.faculity_id} value={faculity.faculity_id}>
                                    {faculity.faculity_name} 
                                </option>
                            ))}
                        </select>
                    </div>
                  
                     
                    <button type="submit" className="submit-button">Register Department</button>
                </form>
                {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default RegisterDepartment;
