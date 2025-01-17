import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/RegisterCourse.css";
import { API_URL } from "../api";

const RegisterCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [yearId, setYearId] = useState("");
  const [semsterId, setSemisterId] = useState("");

  const [message, setMessage] = useState("");
  const [departments, setdepartments] = useState([]);

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
      await axios.post( `${API_URL}/register/course`, {
        courseName,
        departmentId,
        yearId,
        semsterId,
      });
      setMessage("Course registered successfully!");
      setCourseName("");
      setDepartmentId("");
      setSemisterId("");
      setYearId("");
    } catch (error) {
      setMessage("Failed to register course.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register New Course</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="form-input"
              placeholder="Enter course name"
            />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
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
            <label>year:</label>
            <select
              value={yearId}
              onChange={(e) => setYearId(e.target.value)}
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
              value={semsterId}
              onChange={(e) => setSemisterId(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Semister</option>
              {semsters.map((semster) => (
                <option key={semster.semster_id} value={semster.semster_id}>
                  {semster.semster_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Register Course
          </button>
        </form>
        {message && (
          <p
            className={`message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterCourse;
