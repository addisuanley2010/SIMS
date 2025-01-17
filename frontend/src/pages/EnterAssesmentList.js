import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseStudents.css";
import { AuthContext } from "../auth/AuthContext";
import { API_URL } from "../api";

const EnterAssesmentList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const { user_id } = useContext(AuthContext);

  useEffect(() => {
    const fetchEnterAssesmentList = async () => {
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
    fetchEnterAssesmentList();
  }, [user_id]);

  const handleEdit = (index) => {
    setEditingId(index);
    setEditedValues(courses[index]);
  };

  const handleSave = async (index,enrollementId) => {
    try {
      await axios.put(`${API_URL}/teacher/update-assessment/${enrollementId}`, editedValues);
      
      const updatedCourses = [...courses];
      updatedCourses[index] = editedValues;
      setCourses(updatedCourses);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value
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
        <p>Teacher Name {courses[0]?.teacher_name}</p>
        {courses?.length > 0 && courses[0].course_name !==null ? (
          <div className="table-responsive">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th> Name</th>
                  <th>Final</th>
                  <th>Mid</th>
                  <th>Assignment</th>
                  <th>Test</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course.student_name}</td>
                    <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.final || ''}
                          onChange={(e) => handleChange('final', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ) : (
                        course.final || "-"
                      )}
                    </td>
                    <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.mid || ''}
                          onChange={(e) => handleChange('mid', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ) : (
                        course.mid || "-"
                      )}
                    </td>
                    <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.assignment || ''}
                          onChange={(e) => handleChange('assignment', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ) : (
                        course.assignment || "-"
                      )}
                    </td>
                    <td>
                      {editingId === index ? (
                        <input
                          type="number"
                          value={editedValues.test || ''}
                          onChange={(e) => handleChange('test', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ) : (
                        course.test || "-"
                      )}
                    </td>
                    <td>
                      {editingId === index ? (
                        <button 
                          onClick={() => handleSave(index,course.enrollement_id)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                          }}
                        >Save</button>
                      ) : (
                        <button 
                          onClick={() => handleEdit(index)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                          }}
                        >Edit</button>
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

export default EnterAssesmentList;