import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/CourseStudents.css";
import { API_URL } from "../api";

const StudentsResult = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams();

  useEffect(() => {
    const fetchStudentsResult = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/student/${studentId}/student-assessments`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentsResult();
  }, [studentId]);

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-container">
      <div className="courses-card">
        <h2 className="courses-title">
          Student Assessments of {courses[0].student_name}
        </h2>
        {courses.length > 0 ? (
          <div className="table-responsive">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Course Name</th>
                  <th>Teacher Name</th>
                  <th>Test</th>
                  <th>Assignment</th>
                  <th>Mid</th>

                  <th>Final</th>
                  <th>Total (100%)</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course.course_name}</td>
                    <td>
                      {!course.teacher_name
                        ? "Not assigned!"
                        : course.teacher_name}
                    </td>
                    <td>{course.test || "-"}</td>
                    <td>{course.assignment || "-"}</td>
                    <td>{course.mid || "-"}</td>

                    <td>{course.final || "-"}</td>
                    <td>
                      {parseFloat(course.test) +
                        parseFloat(course.assignment) +
                        parseFloat(course.mid) +
                        parseFloat(course.final)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-courses">No assessments found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentsResult;
