import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../api";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  
  useEffect(() => { 
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        setStats(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  },[])

  const recentEnrollments = [
   
  ];

  return (
    <div style={dashboardContainer}>
      <div style={statsContainer}>
        {[
          { title: "Total Students", value: stats[0]?.total_student, color: "#FF6B6B" },
          { title: "Faculties", value: stats[0]?.total_faculity, color: "#4ECDC4" },
          { title: "Teachers", value: stats[0]?.total_teacher, color: "#45B7D1" },
          { title: "Department", value: stats[0]?.total_department, color: "#96CEB4" }
        ].map((stat, index) => (
          <div key={index} style={{...statCard, borderTop: `4px solid ${stat.color}`}}>
            <h3 style={statTitle}>{stat.title}</h3>
            <p style={{...statNumber, color: stat.color}}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={recentActivityContainer}>
        <h2 style={sectionTitle}>Recent Enrollments</h2>
        <div style={tableContainer}>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeader}>
                <th>Student Name</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>{enrollment.name}</td>
                  <td>{enrollment.course}</td>
                  <td>{enrollment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const dashboardContainer = {
  paddingTop: "20px",
  maxWidth: "1400px",
  margin: "0 auto",
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",
  "@media (max-width: 480px)": {
    padding: "10px",
  },
};

const statsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
  padding: "10px",
  "@media (max-width: 480px)": {
    gridTemplateColumns: "1fr",
    gap: "15px",
    padding: "5px",
    justifyItems: "center",
    margin: "0 auto",
  },
};

const statCard = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  },
  "@media (max-width: 480px)": {
    padding: "15px",
    width: "90%",
    margin: "0 auto",
  },
};

const statTitle = {
  fontSize: "1.1rem",
  color: "#2c3e50",
  marginBottom: "15px",
  fontWeight: "600",
  "@media (max-width: 480px)": {
    fontSize: "1rem",
    marginBottom: "10px",
  },
};

const statNumber = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  margin: "10px 0",
  transition: "color 0.3s ease",
  "@media (max-width: 480px)": {
    fontSize: "2rem",
  },
};

const sectionTitle = {
  color: "#2c3e50",
  fontSize: "1.8rem",
  marginBottom: "20px",
  borderBottom: "2px solid #e9ecef",
  paddingBottom: "10px",
  "@media (max-width: 480px)": {
    fontSize: "1.5rem",
    marginBottom: "15px",
  },
};

const recentActivityContainer = {
  backgroundColor: "#fff",
  // padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  margin: "20px 10px",
  "@media (max-width: 480px)": {
    padding: "15px",
    margin: "10px 5px",
  },
};

const tableContainer = {
  overflowX: "auto",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  "@media (max-width: 480px)": {
    margin: "0 -10px",
  },
};


const tableHeader = {
  backgroundColor: "#f8f9fa",
  color: "#2c3e50",
  fontWeight: "600",
  padding: "15px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
  whiteSpace: "nowrap",
  "@media (max-width: 768px)": {
    fontSize: "0.9rem",
  },
  "@media (max-width: 480px)": {
    fontSize: "0.8rem",
  },
};


const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  backgroundColor: "#fff",
  "& th": {
    backgroundColor: "#f8f9fa",
    color: "#2c3e50",
    padding: "15px",
    fontWeight: "600",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
    whiteSpace: "nowrap",
  },
  "& td": {
    padding: "15px",
    textAlign: "left",
    borderBottom: "1px solid #dee2e6",
    color: "#495057",
  },
  "& tr:hover": {
    backgroundColor: "#f8f9fa",
    transition: "background-color 0.3s ease",
  },
  "@media (max-width: 768px)": {
    "& th, & td": {
      padding: "10px",
      fontSize: "0.9rem",
    },
  },
  "@media (max-width: 480px)": {
    "& th, & td": {
      padding: "8px",
      fontSize: "0.8rem",
    },
  },
};

export default Dashboard;