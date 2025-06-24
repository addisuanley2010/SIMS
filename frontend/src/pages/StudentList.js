import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseStudents.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/display/student`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentList();
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
                <th>year</th>
                <th>semister</th>

                <th>Department</th>
                <th>Faculity</th>

                <th>Remark</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student.student_id}>
                  <th>{i + 1}</th>
                  <td>MSS-{student.student_id}</td>
                  <td>{student.student_name}</td>
                  <td>{student.accademic_year}</td>
                  <td>{student.semister}</td>

                  <td>
                    {student.department_name.length > 5
                      ? student.department_name.substring(0, 5) + "..."
                      : student.department_name}
                  </td>
                  <td>
                    {student.faculity_name.length > 5
                      ? student.faculity_name.substring(0, 5) + "..."
                      : student.faculity_name}
                  </td>
                  <td>Enrolled</td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() =>
                        navigate(`/student-assesments/${student.student_id}`)
                      }
                    >
                      View students grade
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

export default StudentList;
