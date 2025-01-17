import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseStudents.css";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";

const FaculityDepartment = () => {
  const [departments, setdepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { faculityId } = useParams();

  useEffect(() => {
    const fetchFaculityDepartment = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/display/department/${faculityId}`
        );
        setdepartments(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculityDepartment();
  }, [faculityId]);

  if (loading) {
    return <div className="loading-spinner">Loading departments...</div>;
  }

  return (
    <div className="course-students-container">
      <h2 className="course-title">List of departments in this faculity</h2>
      {departments.length > 0 ? (
        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>No</th>

                <th> ID</th>
                <th>Department Name</th>
                <th>Department Head</th>

                <th>No_of_student</th>
                <th>Faculity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, i) => (
                <tr key={department.department_id}>
                  <th>{i + 1}</th>
                  <td>MAU-{department.department_id}</td>

                  <td>{department.department_name}</td>

                  <td>Mr. Dawit</td>
                  <td>200</td>

                  <td>{department.faculity_name}</td>
                  <td>
                    <button>Edit</button>
                    <button>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-departments-message">
          No departments registered in this Faculity yet.
        </div>
      )}
    </div>
  );
};

export default FaculityDepartment;
