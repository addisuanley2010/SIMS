// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../api";
// import "../public_pages/css/Login.css";
// import { AuthContext } from "../auth/AuthContext";
// import { toast } from "react-toastify";
// const Login = () => {
//   const {
//     setIsAuthenticated,
//     setDialogOpen,
//     setUser_id,
//     setUsername,
//     setRole,
//   } = useContext(AuthContext);

//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//     role: "student",
//   });

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${API_URL}/login`
// , {
//         username: credentials.username,
//         password: credentials.password,
//         role: credentials.role,
//       });

//       localStorage.setItem("token", response.data.token);
//       setIsAuthenticated(true);
//       setRole(response.data.role);
//       setUsername(credentials.username);
//       setUser_id(response.data.id);
//       navigate("/dashboard");
//       toast.success("Successfully logged in");
//     } catch (err) {
//       setUsername(credentials.username);

//       err.response.data.isPasswordChanged
//         ? toast.warning(err.response.data.error)
//         : toast.error(err.response.data.error);
//       setDialogOpen(err.response.data.isPasswordChanged);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h1>Welcome Back!</h1>
//           <p>Please login to access your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">

//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={credentials.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="role">Login as</label>
//             <select
//               id="role"
//               name="role"
//               value={credentials.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="student">Student</option>
//               <option value="teacher">Teacher</option>
//             </select>
//           </div>

//           <div className="form-footer">
//             <div className="remember-me">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember me</label>
//             </div>
//             <a href="/forgot-password" className="forgot-password">
//               Forgot Password?
//             </a>
//           </div>

//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import "../public_pages/css/Login.css";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const {
    setIsAuthenticated,
    setDialogOpen,
    setUser_id,
    setUsername,
    setRole,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the button is clicked
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: credentials.username,
        password: credentials.password,
        role: credentials.role,
      });

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setRole(response.data.role);
      setUsername(credentials.username);
      setUser_id(response.data.id);
      navigate("/dashboard");
      toast.success("Successfully logged in");
    } catch (err) {
      setUsername(credentials.username);
      err.response.data.isPasswordChanged
        ? toast.warning(err.response.data.error)
        : toast.error(err.response.data.error);
      setDialogOpen(err.response.data.isPasswordChanged);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Please login to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Login as</label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forget-password" className="forgot-password">
              Forget Password{" "}
            </a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Loading..." : "Login"}{" "}
            {/* Change button text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
