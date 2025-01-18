import React from "react";
import "../public_pages/css/About.css";

const About = () => {
  

  const handleTelegramClick = () => {
    window.open("https://t.me/Addis_Anley", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/addisu-anley", "_blank");
  };

  return (
    <div className="about-container">
      {/* <div className="about-header">
        <h1 className="about-title">About Me</h1>
        <p className="about-subtitle">
          Hi, I'm Addisu Anley. I am software Engineering Graduate from Bahir Dar university and Fullstack developer.
        </p>
      </div> */}

      <div className="about-content">
        <div className="contact-section">
          <h2>Let's Connect</h2>
          <div className="contact-grid">
          
            <div className="contact-card" onClick={handleTelegramClick}>
              <i className="fab fa-telegram"></i>

              <p></p>
              <span>Addis A.</span>
            </div>
            <div className="contact-card" onClick={handleLinkedInClick}>
              <i className="fab fa-linkedin"></i>

                          <p></p>
              <a href="https://www.linkedin.com/in/addisu-anley/">
                Addis A.
              </a>
                      </div>
                      <div className="contact-card" >
              <i className="fas fa-envelope"></i>

              <p></p>
              <span>addisuanley93@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;