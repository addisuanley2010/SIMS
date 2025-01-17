import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/CourseStudents.css";
import { API_URL } from "../api";

const AssesmentList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherId } = useParams();

  useEffect(() => {
    const fetchAssesmentList = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/teacher/${teacherId}/student-assessments`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssesmentList();
  }, [teacherId]);

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-container">
      <div className="courses-card">
        <h2 className="courses-title">
          Student Assessments of {courses[0].course_name}
              </h2>
              <p>Teacher Name { courses[0].teacher_name}</p>
        {courses.length > 0 ? (
          <div className="table-responsive">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>No</th>

                  <th>Student Name</th>
                  <th>Final</th>
                  <th>Mid</th>
                  <th>Assignment</th>
                  <th>Test</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{course.student_name}</td>
                    <td>{course.final || "-"}</td>
                    <td>{course.mid || "-"}</td>
                    <td>{course.assignment || "-"}</td>
                    <td>{course.test || "-"}</td>
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

export default AssesmentList;
