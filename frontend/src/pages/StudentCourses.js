import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/StudentCourses.css';
import { API_URL } from '../api';

const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { studentId } = useParams();

    useEffect(() => {
        const fetchStudentCourses = async () => {
            try {
                const response = await axios.get(`${API_URL}/students/${studentId}/courses`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentCourses();
    }, [studentId]);

    if (loading) {
        return <div className="loading">Loading courses...</div>;
    }

    return (
        <div className="courses-container">
            <div className="courses-card">
                <h2 className="courses-title">Courses for Student ID: {studentId}</h2>
                {courses.length > 0 ? (
                    <div className="table-responsive">
                        <table className="courses-table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Mid Exam Score</th>
                                    <th>Final Exam Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.CourseID}>
                                        <td>{course.CourseID}</td>
                                        <td>{course.CourseName}</td>
                                        <td>{course.MidExam}</td>
                                        <td>{course.FinalExam}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="no-courses">No courses found for this student.</p>
                )}
            </div>
        </div>
    );
};

export default StudentCourses;
