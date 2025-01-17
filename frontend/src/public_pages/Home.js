import React from 'react';
import '../public_pages/css/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {



const navigate = useNavigate();



  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to SIMS</h1>
        <p className="subtitle">Student Information Management System</p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={()=>navigate('/login')}>Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>

      <div className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-user-graduate"></i>
            <h3>Student Management</h3>
            <p>Efficiently manage student records and academic information</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-book"></i>
            <h3>Course Registration</h3>
            <p>Easy course enrollment and schedule management</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Performance Tracking</h3>
            <p>Monitor academic progress and achievements</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Faculty Portal</h3>
            <p>Dedicated space for faculty members and administration</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <h3>1000+</h3>
          <p>Students</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Courses</p>
        </div>
        <div className="stat-item">
          <h3>100+</h3>
          <p>Faculty Members</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our growing academic community today</p>
        <button className="cta-button" onClick={()=>navigate('/login')}>Sign Up Now</button>
      </div>
    </div>
  );
};

export default Home;
