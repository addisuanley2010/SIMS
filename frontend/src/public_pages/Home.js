import React from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <div style={{ marginBottom: '20px' }}>
          <img src="/mku.png" alt="Montessori School Logo" style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
        <h1 style={{ fontSize: '2.5em', color: '#333', marginBottom: '20px' }}>Welcome to Montessori School System</h1>
        <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '30px' }}>Nurturing Independence, Creativity, and Natural Development</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button style={{ padding: '15px 30px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={()=>navigate('/login')}>Join Our Community</button>
          <button style={{ padding: '15px 30px', backgroundColor: 'transparent', color: '#007bff', border: '2px solid #007bff', borderRadius: '5px', cursor: 'pointer' }} onClick={()=>navigate('/methodology')}>Discover Our Method</button>
        </div>
      </div>

      <div style={{ padding: '50px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Educational Approach</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <i className="fas fa-child"></i>
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Child-Centered Learning</h3>
            <p style={{ textAlign: 'center', marginBottom: '15px' }}>Personalized education that follows each child's natural development pace</p>
            <a href="/learning-approach" style={{ color: '#007bff', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Learn More →</a>
          </div>
          <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <i className="fas fa-hands-helping"></i>
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Practical Life Skills</h3>
            <p style={{ textAlign: 'center', marginBottom: '15px' }}>Development of independence through real-world activities</p>
            <a href="/life-skills" style={{ color: '#007bff', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Learn More →</a>
          </div>
          <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <i className="fas fa-brain"></i>
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Sensorial Development</h3>
            <p style={{ textAlign: 'center', marginBottom: '15px' }}>Engaging materials that develop cognitive and sensory skills</p>
            <a href="/sensorial" style={{ color: '#007bff', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Learn More →</a>
          </div>
          <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <i className="fas fa-globe-americas"></i>
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Cultural Studies</h3>
            <p style={{ textAlign: 'center', marginBottom: '15px' }}>Exploration of geography, science, and cultural diversity</p>
            <a href="/cultural-studies" style={{ color: '#007bff', textDecoration: 'none', display: 'block', textAlign: 'center' }}>Learn More →</a>
          </div>
        </div>
      </div>

      <div style={{ padding: '50px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Student Life at Montessori</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <img src="/gallery1.jpg" alt="Students in classroom" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
          <img src="/gallery2.jpg" alt="Outdoor activities" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
          <img src="/gallery3.jpg" alt="Art and creativity" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
          <img src="/gallery4.jpg" alt="Learning materials" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', padding: '50px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', color: '#007bff', marginBottom: '10px' }}>
            <i className="fas fa-calendar-check"></i>
          </div>
          <h3 style={{ fontSize: '2em', marginBottom: '10px' }}>25+</h3>
          <p style={{ color: '#666' }}>Years of Excellence</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', color: '#007bff', marginBottom: '10px' }}>
            <i className="fas fa-users"></i>
          </div>
          <h3 style={{ fontSize: '2em', marginBottom: '10px' }}>12:1</h3>
          <p style={{ color: '#666' }}>Student-Teacher Ratio</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', color: '#007bff', marginBottom: '10px' }}>
            <i className="fas fa-star"></i>
          </div>
          <h3 style={{ fontSize: '2em', marginBottom: '10px' }}>98%</h3>
          <p style={{ color: '#666' }}>Parent Satisfaction</p>
        </div>
      </div>

      <div style={{ padding: '50px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>What Our Students Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '20px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <img src="/student1.jpg" alt="Student 1" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' }} />
            <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>"The Montessori method helped me discover my true potential."</p>
            <h4 style={{ marginBottom: '5px' }}>Sarah Johnson</h4>
            <p style={{ color: '#666' }}>Grade 5</p>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <img src="/student2.jpg" alt="Student 2" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' }} />
            <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>"I love the hands-on learning experience here!"</p>
            <h4 style={{ marginBottom: '5px' }}>Michael Chen</h4>
            <p style={{ color: '#666' }}>Grade 4</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '50px 0', textAlign: 'center', borderRadius: '10px' }}>
        <div>
          <h2 style={{ marginBottom: '20px' }}>Give Your Child the Best Start</h2>
          <p style={{ marginBottom: '30px' }}>Join our nurturing Montessori community where every child thrives</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button style={{ padding: '15px 30px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={()=>navigate('/login')}>Schedule a Visit</button>
            <button style={{ padding: '15px 30px', backgroundColor: 'transparent', color: '#007bff', border: '2px solid #007bff', borderRadius: '5px', cursor: 'pointer' }} onClick={()=>navigate('/virtual-tour')}>Take Virtual Tour</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '50px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Latest News & Events</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <img src="/event1.jpg" alt="Science Fair" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Annual Science Fair</h4>
              <p style={{ marginBottom: '15px' }}>Join us for an exciting showcase of student projects</p>
              <a href="/events" style={{ color: '#007bff', textDecoration: 'none' }}>Learn More →</a>
            </div>
          </div>
          <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <img src="/event2.jpg" alt="Art Exhibition" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Student Art Exhibition</h4>
              <p style={{ marginBottom: '15px' }}>Celebrating creativity and artistic expression</p>
              <a href="/events" style={{ color: '#007bff', textDecoration: 'none' }}>Learn More →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
