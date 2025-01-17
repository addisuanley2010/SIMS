import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseStudents.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const TeacherList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherList = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/display/teacher`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherList();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading students...</div>;
  }

  return (
    <div className="course-students-container">
      <h2 className="course-title">Students Enrolled in Course #</h2>
      {students.length > 0 ? (
        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>No</th>

                <th> ID</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student.student_id}>
                  <th>{i + 1}</th>
                  <td>MAU-{student.teacher_id}</td>
                  <td>{student.teacher_name}</td>
                  <td>{student.department_name}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() =>
                        navigate(`/assesment/${student.teacher_id}`)
                      }
                    >
                      View students
                    </button>
                  </td>
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

export default TeacherList;
