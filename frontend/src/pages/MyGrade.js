import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseStudents.css";
import { AuthContext } from "../auth/AuthContext";
import { API_URL } from "../api";


const MyGrade = () => {
  const [courses, setCourses] = useState([]);
  // const [view, setView] = useState(false);

  const [loading, setLoading] = useState(true);
  const { user_id } = useContext(AuthContext);
  useEffect(() => {
    const fetchMyGrade = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/student/${user_id}/student-assessments`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyGrade();
  }, [user_id]);

  const sum = (...marks) => {
    return marks.reduce((acc, mark) => {
      return acc + (parseFloat(mark) || 0);
    }, 0);
  };

  const getGrade = (marks) => {
    const totalMarks = sum(...marks);

    if (totalMarks >= 90) {
      return "A+";
    } else if (totalMarks >= 85) {
      return "A";
    } else if (totalMarks >= 80) {
      return "A-";
    } else if (totalMarks >= 75) {
      return "B+";
    } else if (totalMarks >= 70) {
      return "B";
    } else if (totalMarks >= 65) {
      return "B-";
    } else if (totalMarks >= 60) {
      return "C+";
    } else if (totalMarks >= 50) {
      return "C";
    } else if (totalMarks >= 45) {
      return "C-";
    } else if (totalMarks >= 40) {
      return "D";
    } else {
      return "F";
    }
  };

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
                  <th>Total </th>
                  <th>Grade</th>
                  {/* <th>Action</th> */}
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
                      {sum(
                        course.test,
                        course.assignment,
                        course.mid,
                        course.final
                      )}
                    </td>
                    <td>
                      {getGrade([
                        course.test,
                        course.assignment,
                        course.mid,
                        course.final,
                      ])}
                    </td>
                    {/* <td>
                      <input
                        type={view ? "text" : "password"}
                        value={getGrade([
                          course.test,
                          course.assignment,
                          course.mid,
                          course.final,
                        ])}
                      />
                    </td> */}

                    {/* <td>
                      <button
                        onClick={() => {
                          setView(!view);
                        }}
                      >
                        View
                      </button>
                    </td> */}
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

export default MyGrade;
