import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseStudents.css";
import { AuthContext } from "../auth/AuthContext";
import { API_URL } from "../api";

const EnterAssessmentList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const { user_id } = useContext(AuthContext);

  useEffect(() => {
    const fetchEnterAssessmentList = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/teacher/${user_id}/student-assessments`
        );
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnterAssessmentList();
  }, [user_id]);

  const handleEdit = (index) => {
    setEditingId(index);
    setEditedValues(courses[index]);
  };

  const handleSave = async (index, enrollementId) => {
    try {
      await axios.put(
        `${API_URL}/teacher/update-assessment/${enrollementId}`,
        editedValues
      );

      const updatedCourses = [...courses];
      updatedCourses[index] = editedValues;
      setCourses(updatedCourses);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-container">
      <div className="courses-card">
        <h2 className="courses-title">
          Student Assessments of {courses[0]?.course_name}
        </h2>
        <p>Teacher Name: {courses[0]?.teacher_name}</p>
        {courses?.length > 0 && courses[0].course_name !== null ? (
          <div className="table-responsive">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Student's Name</th>
                  {/* <th>Class Activity (5%)</th> */}
                  {/* <th>Test One (10%)</th> */}
                  {/* <th>C & H Work (5%)</th> */}
                  {/* <th>Project Work (5%)</th> */}
                  <th>Ex. Book (10%)</th>
                  <th>Assessment (50%)</th>
                  {/* <th>Atten. and Dici. (5%)</th> */}
                  <th>Final Exam (40%)</th>
                  <th>total (100%)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course.student_name}</td>
                    {/* <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.activity || ""}
                          onChange={(e) =>
                            handleChange("activity", e.target.value)
                          }
                          style={inputStyle}
                        />
                      ) : (
                        course.activity || "-"
                      )}
                    </td> */}
                    {/* <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.test || ""}
                          onChange={(e) => handleChange("test", e.target.value)}
                          style={inputStyle}
                        />
                      ) : (
                        course.test || "-"
                      )}
                    </td> */}
                    {/* <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.homework || ""}
                          onChange={(e) =>
                            handleChange("homework", e.target.value)
                          }
                          style={inputStyle}
                        />
                      ) : (
                        course.homework || "-"
                      )}
                    </td> */}
                    {/* <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.assignment || ""}
                          onChange={(e) =>
                            handleChange("assignment", e.target.value)
                          }
                          style={inputStyle}
                        />
                      ) : (
                        course.assignment || "-"
                      )}
                    </td> */}
                    <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.ex_book || ""}
                          onChange={(e) =>
                            handleChange("ex_book", e.target.value)
                          }
                          style={inputStyle}
                        />
                      ) : (
                        course.ex_book || "-"
                      )}
                    </td>
                    <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.mid || ""}
                          onChange={(e) => handleChange("mid", e.target.value)}
                          style={inputStyle}
                        />
                      ) : (
                        course.mid || "-"
                      )}
                    </td>
                    {/* <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.attendance || ""}
                          onChange={(e) =>
                            handleChange("attendance", e.target.value)
                          }
                          style={inputStyle}
                        />
                      ) : (
                        course.attendance || "-"
                      )}
                    </td> */}
                    <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.final || ""}
                          onChange={(e) =>
                            handleChange("final", e.target.value)
                          }
                          style={inputStyle}
                        />
                      ) : (
                        course.final || "-"
                      )}
                    </td>
                    <td>
                      {Number(course.final) +
                        Number(course.mid) +
                        // Number(course.assignment) +
                        // Number(course.test) +
                        // Number(course.homework) +
                        // Number(course.activity) +
                        // Number(course.attendance) +
                        Number(course.ex_book) || 0}
                    </td>{" "}
                    <td>
                      {editingId === index ? (
                        <button
                          onClick={() =>
                            handleSave(index, course.enrollement_id)
                          }
                          style={buttonStyle("save")}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(index)}
                          style={buttonStyle("edit")}
                        >
                          Edit
                        </button>
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

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "14px",
  transition: "all 0.3s ease",
};

const buttonStyle = (type) => ({
  padding: "8px 16px",
  backgroundColor: type === "save" ? "#4CAF50" : "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
});

export default EnterAssessmentList;
