import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/EnrolledStudentList.css';
import { API_URL } from '../api';

const EnrolledStudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledStudents = async () => {
            try {
                const response = await axios.get(`${API_URL}/enrolled-students`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrolledStudents();
    }, []);

    if (loading) {
        return <div className="loading">Loading students...</div>;
    }

    return (
        <div className="enrolled-students-container">
            <h2 className="enrolled-title">Enrolled Students</h2>
            <div className="students-grid">
                {students.map(student => (
                    <div key={student.StudentID} className="student-card">
                        <div className="student-info">
                            <div className="student-avatar">
                                {student.Name.charAt(0)}
                            </div>
                            <h3 className="student-name">{student.Name}</h3>
                            <p className="student-email">{student.Email}</p>
                            <Link 
                                to={`/students/${student.StudentID}/courses`}
                                className="view-courses-btn"
                            >
                                View Courses
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrolledStudentList;
