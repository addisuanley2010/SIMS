import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseList.css";
import { API_URL } from "../api";
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [courseDetail, setcourseDetail] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [listOfTeachers, setListOfTeachers] = useState([]);




  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/display/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleDetail = async (courseId, departmentId) => {
    try {
      const res = await axios.get(
        `${API_URL}/display/courses/${courseId}`
      );
// setCourseId
      const resTeachers = await axios.get(
        `${API_URL}/display/teacher/${departmentId}`
      );
      setListOfTeachers(resTeachers.data);
      
      setcourseDetail(res.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleAssignTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/assign/teacher`, {
        courseId: courseDetail[0].course_id,
        teacherId: selectedTeacher,
      });
      setOpen(false);
      setSelectedTeacher("");
      // Refresh courses after assignment
      const response = await axios.get(`${API_URL}/display/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error assigning teacher:", error);
    }
  };

    return (
      <div className="course-container">
        <h2 className="course-title">Available Courses</h2>
      {open && (
        <dialog open={true} className="course-dialog">
          <div className="dialog-header">
            <h2>Course Details</h2>
            <button className="close-button" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="dialog-content">
            {courseDetail && (
              <div className="course-details">
                <div className="detail-item">
                  <h3>Course Information</h3>
                  <p>
                    <strong>Course Name:</strong> {courseDetail[0].course_name}
                  </p>
                  <p>
                    <strong>Course ID:</strong> {courseDetail[0].course_id}
                    </p>
                  <p>
                    <strong>Department :</strong>{" "}
                    {courseDetail[0].department_name}
                    </p>
                    <p>
                    <strong>Teacher :</strong>{" "}
                    {!courseDetail[0].teacher_name? "Not Assigned" : courseDetail[0].teacher_name}
                  </p>
                
                  <p>
                    <strong>Year:</strong>{" "}
                    {courseDetail[0].yearr }
                    </p>
                    <p>
                    <strong>Semister:</strong>{" "}
                    {courseDetail[0].semister }
                  </p>
                </div>
                <div className="assign-teacher-section">
                  <h3>Assign Teacher</h3>
                  <form onSubmit={handleAssignTeacher} className="assign-form">
                    <div className="form-group">
                      <label>Select Teacher:</label>
                      <select
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                        required
                        className="form-select"
                      >
                        <option value="">Choose a teacher</option>
                        {listOfTeachers.map((teacher) => (
                          <option key={teacher.teacher_id} value={teacher.teacher_id}>
                            {teacher.teacher_name}
                          </option>
                        ))}
                       
                      </select>
                    </div>
                    <button type="submit" className="assign-button">
                      Assign Teacher
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </dialog>
      )}
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
              <th>Course ID</th>
              <th>Department</th>
              <th>year</th>
              <th>semister</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td>{course.course_name}</td>
              <td>{course.course_id}</td>
              <td>{course.department_name}</td>

              <td>{course.yearr}</td>

              <td>{course.semister}</td>

              <td>
                <button
                  className="view-details-btn"
                  onClick={() => handleDetail(course.course_id, course.department_id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;