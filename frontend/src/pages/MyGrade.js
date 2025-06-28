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
                <th>S.NO</th>
                  <th>Course Name</th>
                  <th>Teacher Name</th>
                  {/* <th>Class Activity (5%)</th> */}
                  {/* <th>Test One (10%)</th> */}
                  {/* <th>C & H Work (5%)</th> */}
                  {/* <th>Project Work (5%)</th> */}
                  <th>Ex. Book (10%)</th>
                  <th>Assessment(50%)</th>
                  {/* <th>Atten. and Dici. (5%)</th> */}
                  <th>Final Exam (40%)</th>
                  <th>total (100%)</th>
                 
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
                    {/* <td>{course.activity || "-"}</td> */}
                    {/* <td>{course.test || "-"}</td> */}
                    {/* <td>{course.homework || "-"}</td> */}
                    {/* <td>{course.assignment || "-"}</td> */}
                    <td>{course.ex_book || "-"}</td>
                    <td>{course.mid || "-"}</td>
                    {/* <td>{course.attendance || "-"}</td> */}
                    <td>{course.final || "-"}</td>

                    <td>
                      {sum(
                        // course.test,
                        // course.assignment,
                        course.mid,
                        course.final,
                        // course.activity,
                        // course.homework,  
                        course.ex_book,
                        // course.attendance
                      )}
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

export default MyGrade;
