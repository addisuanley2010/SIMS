import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/CourseStudents.css';
import { API_URL } from '../api';

const CourseStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { courseId } = useParams();

    useEffect(() => {
        const fetchCourseStudents = async () => {
            try {
                const response = await axios.get(`${API_URL}/courses/${courseId}/students`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseStudents();
    }, [courseId]);

    if (loading) {
        return <div className="loading-spinner">Loading students...</div>;
    }

    return (
        <div className="course-students-container">
            <h2 className="course-title">Students Enrolled in Course #{courseId}</h2>
            {students.length > 0 ? (
                <div className="table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.StudentID}>
                                    <td>{student.StudentID}</td>
                                    <td>{student.Name}</td>
                                    <td>{student.Email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-students-message">
                    No students enrolled in this course yet.
                </div>
            )}
        </div>
    );
};

export default CourseStudents;
