import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/EnrollStudent.css";
import { API_URL } from "../api";

const RegisterPerson = () => {
  const [departmentId, setdepartmentId] = useState("");
  const [personName, setpersonName] = useState("");
  const [message, setMessage] = useState("");
  const [departments, setdepartments] = useState([]);
  const [role, setRole] = useState();
  const [year, setYear] = useState();
  const [semister, setSemister] = useState();


  const roles = [
    { roles_id: 1, roles_name: "student" },
    { roles_id: 2, roles_name: "instructor" },
    { roles_id: 3, roles_name: "admin" },
  ];

  const years = [
    { year_id: 1, year_name: "year 1" },
    { year_id: 2, year_name: "year 2" },
    { year_id: 3, year_name: "year 3" },
    { year_id: 4, year_name: "year 4" },
    { year_id: 5, year_name: "year 5" },
  ];
  const semsters = [
    { semster_id: 1, semster_name: "semister I" },
    { semster_id: 2, semster_name: "semister II" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await axios.get(
           `${API_URL}/display/department`
        );
        setdepartments(departmentsResponse.data);
      } catch (error) {
        setMessage("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    
    try {
      if (role !== 1) {

        await axios.post( `${API_URL}/register/teacher`, {
          personName,
          departmentId,
          role,
        });
        setMessage("Enrollment successful!");
        setdepartmentId("");
        setpersonName("");
        setRole("");
      } else {
        
        await axios.post( `${API_URL}/register/student`, {
          personName,
          departmentId,
          role,
          year,
          semister
        });
        setMessage("Enrollment successful!");
        setdepartmentId("");
        setpersonName("");
        setRole("");


      }} catch (error) {
      setMessage("Student is already registered for this course!");
    }
  };

  return (
    <div className="enroll-container">
      <div className="enroll-card">
        <h2 className="enroll-title">Register Staff Member</h2>
        <form onSubmit={handleSubmit} className="enroll-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="staff name"
              value={personName}
              onChange={(e) => setpersonName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <select
              value={departmentId}
              onChange={(e) => setdepartmentId(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option
                  key={department.department_id}
                  value={department.department_id}
                >
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.roles_id} value={role.roles_id}>
                  {role.roles_name}
                </option>
              ))}
            </select>
          </div>
          {role == 1 && (
            <div className="display-flex">
              <div className="form-group">
                <label>Year:</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="form-select"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year.year_id} value={year.year_id}>
                      {year.year_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Semister:</label>
                <select
                  value={semister}
                  onChange={(e) => setSemister(e.target.value)}
                  required
                  className="form-select"
                >
                  <option value="">Select semister</option>
                  {semsters.map((semister) => (
                    <option
                      key={semister.semster_id}
                      value={semister.semster_id}
                    >
                      {semister.semster_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <button type="submit" className="submit-button">
            Enroll Student
          </button>
        </form>
        {message && (
          <p
            className={`message ${
              message.includes("successful") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPerson;
