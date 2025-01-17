import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CourseStudents.css";
import { API_URL } from "../api";

const DepartmentList = () => {
  const [departments, setdepartments] = useState([]);

  useEffect(() => {
    const fetchdepartments = async () => {
      const response = await axios.get(
        `${API_URL}/display/department`
      );
      console.log(response.data);
      setdepartments(response.data);
    };
    fetchdepartments();
  }, []);

  return (
    <div className="course-students-container">
      <h3 className="course-title">List of departments </h3>
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

                  <td>
                    {department.faculity_name.length > 5
                      ? department.faculity_name.substring(0, 5) + "..."
                      : department.faculity_name}
                  </td>

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

export default DepartmentList;
