import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/FaculityList.css";
import { API_URL } from "../api";
const FaculityList = () => {
  const [faculity, setFaculity] = useState([]);

  useEffect(() => {
    const fetchFaculity = async () => {
      const response = await axios.get(
        `${API_URL}/display/faculity`
      );
      setFaculity(response.data);
    };
    fetchFaculity();
  }, []);

  return (
    <div className="course-container">
      <h2 className="course-title">Available Collages</h2>
      <div className="course-grid">
        {faculity.map((faculity) => (
          <div key={faculity.faculity_id} className="course-card">
            <div className="course-content">
              <h4>{faculity.faculity_name}</h4>
              <h6>Collage dean: Mr. Jhon</h6>

              <p className="course-id">Faculity ID: {faculity.faculity_id}</p>
              <Link
                to={`/faculities/${faculity.faculity_id}`}
                className="view-details-btn"
              >
                View Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaculityList;
