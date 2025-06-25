import React from "react";
import "../public_pages/css/About.css";

const About = () => {
  

  const handleTelegramClick = () => {
    window.open("https://t.me/Addis_Anley", "_blank");
  };
  const handleTelegramClick1 = () => {
    window.open("https://t.me/ab_se7p", "_blank");
  };
  
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/abebe_tafere", "_blank");
  };

  return (
    <div className="about-container">
  

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
          <br/>
          <div className="contact-grid">
          
          <div className="contact-card" onClick={handleTelegramClick1}>
            <i className="fab fa-telegram"></i>

            <p></p>
            <span>Abebe T.</span>
          </div>
          <div className="contact-card" onClick={handleLinkedInClick}>
            <i className="fab fa-linkedin"></i>

                        <p></p>
            <a href="https://www.linkedin.com/in/addisu-anley/">
              Abebe T.
            </a>
                    </div>
                    <div className="contact-card" >
            <i className="fas fa-envelope"></i>

            <p></p>
            <span>abebetafere12@gmail.com</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default About;