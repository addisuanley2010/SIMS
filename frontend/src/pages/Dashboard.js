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

  return (
    <div style={dashboardContainer}>
      <div style={headerStyle}>
        <img src="/mku.png" alt="Montessori School Logo" style={logoStyle}/>
        <h1 style={schoolTitleStyle}>Montessorian School System</h1>
      </div>
      
      <div style={welcomeBannerStyle}>
        <h2>Welcome to Our Learning Community</h2>
        <p>Nurturing independence, creativity, and a love for learning</p>
      </div>

      <div style={statsContainer}>
        {[
          { title: "Total Students", value: 29, color: "#FF6B6B", icon: "👥" },
          { title: "Grade", value: 11, color: "#4ECDC4", icon: "📚" },
          { title: "Teachers", value: 1, color: "#45B7D1", icon: "👩‍🏫" },
          { title: "Section", value: 1, color: "#96CEB4", icon: "🎨" }
        ].map((stat, index) => (
          <div key={index} style={{...statCard, borderTop: `4px solid ${stat.color}`}}>
            <span style={statIconStyle}>{stat.icon}</span>
            <h3 style={statTitle}>{stat.title}</h3>
            <p style={{...statNumber, color: stat.color}}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={featuredSectionStyle}>
        <div style={montessoriPrinciplesStyle}>
          <h3 style={sectionTitle}>Montessorian School System</h3>
          <div style={principlesGridStyle}>
            <div style={principleCardStyle}>
              <h4>Prepared Environment</h4>
              <p>Carefully designed spaces that promote learning and exploration</p>
            </div>
            <div style={principleCardStyle}>
              <h4>Child-Centered Learning</h4>
              <p>Supporting individual growth and development</p>
            </div>
            <div style={principleCardStyle}>
              <h4>Hands-on Learning</h4>
              <p>Interactive materials and practical life experiences</p>
            </div>
          </div>
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
    padding: "15px",
    marginRight: "5px",
    marginLeft: "5px",
  },
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const logoStyle = {
  width: "80px",
  height: "80px",
  objectFit: "contain",
  marginRight: "20px",
};

const schoolTitleStyle = {
  fontSize: "2.2rem",
  color: "#2c3e50",
  margin: 0,
  fontFamily: "'Montserrat', sans-serif",
  "@media (max-width: 480px)": {
    fontSize: "1.8rem",
  },
};

const welcomeBannerStyle = {
  backgroundColor: "#4ECDC4",
  color: "#ffffff",
  padding: "30px",
  borderRadius: "12px",
  marginBottom: "30px",
  textAlign: "center",
  "@media (max-width: 480px)": {
    padding: "20px",
    "& h2": {
      fontSize: "1.4rem",
    },
    "& p": {
      fontSize: "0.9rem",
    },
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
    gap: "10px",
    padding: "3px",
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
    padding: "12px",
    width: "95%",
    margin: "0 auto",
  },
};

const statIconStyle = {
  fontSize: "2rem",
  display: "block",
  marginBottom: "10px",
  "@media (max-width: 480px)": {
    fontSize: "1.5rem",
  },
};

const statTitle = {
  fontSize: "1.1rem",
  color: "#2c3e50",
  marginBottom: "15px",
  fontWeight: "600",
  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
    marginBottom: "8px",
  },
};

const statNumber = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  margin: "10px 0",
  transition: "color 0.3s ease",
  "@media (max-width: 480px)": {
    fontSize: "1.8rem",
  },
};

const featuredSectionStyle = {
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  marginTop: "30px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  "@media (max-width: 480px)": {
    padding: "15px",
  },
};

const montessoriPrinciplesStyle = {
  marginTop: "20px",
};

const principlesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "20px",
  "@media (max-width: 480px)": {
    gridTemplateColumns: "1fr",
    gap: "15px",
  },
};

const principleCardStyle = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  "& h4": {
    color: "#2c3e50",
    marginBottom: "10px",
  },
  "& p": {
    color: "#666",
    fontSize: "0.9rem",
  },
  "@media (max-width: 480px)": {
    padding: "15px",
    "& h4": {
      fontSize: "1rem",
    },
    "& p": {
      fontSize: "0.8rem",
    },
  },
};

const sectionTitle = {
  color: "#2c3e50",
  fontSize: "1.8rem",
  marginBottom: "20px",
  borderBottom: "2px solid #e9ecef",
  paddingBottom: "10px",
  "@media (max-width: 480px)": {
    fontSize: "1.3rem",
    marginBottom: "12px",
  },
};

export default Dashboard;