import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/EnrollStudent.css';
import { API_URL } from '../api';

const EnrollStudent = () => {
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [midExam, setMidExam] = useState(0);
    const [finalExam, setFinalExam] = useState(0);
    const [message, setMessage] = useState('');
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsResponse = await axios.get(`${API_URL}/students`);
                const coursesResponse = await axios.get(`${API_URL}/courses`);
                setStudents(studentsResponse.data);
                setCourses(coursesResponse.data);
            } catch (error) {
                setMessage('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/enroll`, { studentId, courseId, midExam, finalExam });
            setMessage('Enrollment successful!');
            setStudentId('');
            setCourseId('');
            setMidExam('');
            setFinalExam('');
        } catch (error) {
            setMessage('Student is already registered for this course!');
        }
    };

    return (
        <div className="enroll-container">
            <div className="enroll-card">
                <h2 className="enroll-title">Enroll Student in Course</h2>
                <form onSubmit={handleSubmit} className="enroll-form">
                    <div className="form-group">
                        <label>Student:</label>
                        <select 
                            value={studentId} 
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                            className="form-select"
                        >
                            <option value="">Select Student</option>
                            {students.map(student => (
                                <option key={student.StudentID} value={student.StudentID}>
                                    {student.Name} 
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Course:</label>
                        <select 
                            value={courseId} 
                            onChange={(e) => setCourseId(e.target.value)}
                            required
                            className="form-select"
                        >
                            <option value="">Select Course</option>
                            {courses.map(course => (
                                <option key={course.CourseID} value={course.CourseID}>
                                    {course.CourseName} 
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mid Exam Score:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            value={midExam} 
                            onChange={(e) => setMidExam(e.target.value)} 
                            required 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Final Exam Score:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            value={finalExam} 
                            onChange={(e) => setFinalExam(e.target.value)} 
                            required 
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-button">Enroll Student</button>
                </form>
                {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default EnrollStudent;
