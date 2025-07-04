import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import RegisterFaculity from "./pages/RegisterFaculity";
import RegisterCourse from "./pages/RegisterCourse";
import EnrollStudent from "./pages/EnrollStudent";
import FaculityList from "./pages/FaculityList";
import CourseList from "./pages/CourseList";
import EnrolledStudents from "./pages/EnrolledStudents";
import StudentCourses from "./pages/StudentCourses";
import CourseStudents from "./pages/CourseStudents";
import RegisterDepartment from "./pages/RegisterDepartment";
import DepartmentList from "./pages/DepartmentList";
import RegisterPerson from "./pages/RegisterPerson";
import StudentList from "./pages/StudentList";
import TeacherList from "./pages/TeacherList";
import FaculityDepartment from "./pages/FaculityDepartment";
import AssesmentList from "./pages/AssesmentList";
import StudentsResult from "./pages/StudentsResult";
import Home from "./public_pages/Home";
import Login from "./public_pages/Login";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { AuthContext } from "./auth/AuthContext";
import MyGrade from "./pages/MyGrade";
import MyCourse from "./pages/MyCourse";
import EnterAssesmentList from "./pages/EnterAssesmentList";
import PasswordChangeDialog from "./components/PasswordChangeDialog";
import { toast } from "react-toastify";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem, Avatar, Button } from "@mui/material";

import { API_URL } from "./api";
import About from "./public_pages/About";
// import WelcomeHeader from "./WelcomeHeader";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    username,
    role,
    setUsername,
    setRole,
    setUser_id,
    setDialogOpen,
    isDialogOpen,
  } = useContext(AuthContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${API_URL}/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.user.isAuthenticated) {
            setIsAuthenticated(true);
            setUsername(response.data.user.username);
            setRole(response.data.user.role);
            setUser_id(response.data.user.id);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error("Error checking authentication:", mobileMenuAnchor);
          setIsAuthenticated(false);
        });
    }
  }, [setIsAuthenticated, setUsername, setRole]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put(`${API_URL}/change-password`, {
        username,
        currentPassword,
        newPassword,
      });
      toast.success("password changed successfully!");
      setDialogOpen(false);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setMobileMenuAnchor(null);
    setDrawerOpen(false);
  };

  const renderNavLinks = () => {
    const navLinkStyle = {
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
      padding: "12px 24px",
      display: "block",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        transform: "translateX(5px)",
      },
    };

    if (role === "admin") {
      return (
        <Box component="ul" sx={ulStyle}>
          <li>
            <NavLink
              to="/dashboard"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register-faculity"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Register Faculty
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register-department"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Register Department
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register-staff"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Register Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register-course"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Register Course
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              List of Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teachers"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Teachers List
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/faculities"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              List of Faculties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/departments"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              List of Departments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              List of Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              About
            </NavLink>
          </li>
        </Box>
      );
    } else if (role === "teacher") {
      return (
        <Box component="ul" sx={ulStyle}>
          <li>
            <NavLink
              to="/dashboard"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/enter-student-assesment"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Enter Assesment
            </NavLink>
          </li>
        </Box>
      );
    } else if (role === "student") {
      return (
        <Box component="ul" sx={ulStyle}>
          <li>
            <NavLink
              to="/dashboard"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-grades"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              View Grades
            </NavLink>
          </li>
         
          <li>
            <NavLink
              to="/about"
              style={navLinkStyle}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              About
            </NavLink>
          </li>
        </Box>
      );
    }
  };

  return (
    <Router>
      {/* <WelcomeHeader /> */}

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <PasswordChangeDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onChangePassword={handleChangePassword}
        />

        {isAuthenticated && (
          <>
            {isMobile ? (
              <>
                <AppBar
                  position="fixed"
                  sx={{ zIndex: theme.zIndex.drawer + 1 }}
                >
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => setDrawerOpen(!drawerOpen)}
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      MSS SIMS
                    </Typography>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem>
                        <Avatar sx={{ mr: 1 }} />
                        {username}
                      </MenuItem>
                      <MenuItem sx={{ color: "text.secondary" }}>
                        Role: {role}
                      </MenuItem>
                      <MenuItem onClick={() => setDialogOpen(true)}>
                        Change Password
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleLogout();
                          handleMenuClose();
                        }}
                        sx={{ color: "error.main" }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </Toolbar>
                </AppBar>
                <Drawer
                  variant="temporary"
                  anchor="left"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  sx={{
                    width: 250,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: 250,
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {renderNavLinks()}
                </Drawer>
              </>
            ) : (
              <Drawer
                variant="permanent"
                sx={{
                  width: 250,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: 250,
                    backgroundColor: theme.palette.primary.dark,
                    boxSizing: "border-box",
                  },
                }}
              >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                  <Box sx={logoStyle}>
                    <Typography variant="h6" sx={logoTextStyle}>
                      MSS SIMS {username} {role}
                    </Typography>
                  </Box>
                  {renderNavLinks()}
                    <Box sx={logoutContainerStyle}>
                      <Button
                        onClick={handleMenuOpen}
                        startIcon={<AccountCircleIcon />}
                        sx={{
                          color: "white",
                          width: "100%",
                          justifyContent: "flex-start",
                          padding: "12px",
                        }}
                      >
                        Profile
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem>
                          <Avatar sx={{ mr: 1 }} />
                          {username}
                        </MenuItem>
                        <MenuItem sx={{ color: "text.secondary" }}>
                          Role: {role}
                        </MenuItem>
                        <MenuItem onClick={() => setDialogOpen(true)}>
                          Change Password
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleLogout();
                            handleMenuClose();
                          }}
                          sx={{ color: "error.main" }}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                  </Box>
                </Box>
              </Drawer>
            )}
          </>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // p: 3,
            backgroundColor: theme.palette.background.default,
            marginTop: isMobile ? "64px" : 0,
            marginLeft: isAuthenticated ? (isMobile ? 0 : 0) : 0,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
              }
            />
            <Route
              path="/*"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
             <Route
              path="/about"
              element={
                <ProtectedRoute>

                  <About />
                  </ProtectedRoute>

              }
            />
            <Route
              path="/register-faculity"
              element={
                <ProtectedRoute>
                  <RegisterFaculity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-course"
              element={
                <ProtectedRoute>
                  <RegisterCourse />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/enroll"
              element={
                <ProtectedRoute>
                  <EnrollStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculities"
              element={
                <ProtectedRoute>
                  <FaculityList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CourseList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/enrolled-students"
              element={
                <ProtectedRoute>
                  <EnrolledStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-staff"
              element={
                <ProtectedRoute>
                  <RegisterPerson />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <StudentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teachers"
              element={
                <ProtectedRoute>
                  <TeacherList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculities/:faculityId"
              element={
                <ProtectedRoute>
                  <FaculityDepartment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assesment/:teacherId"
              element={
                <ProtectedRoute>
                  <AssesmentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/enter-student-assesment"
              element={
                <ProtectedRoute>
                  <EnterAssesmentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-assesments/:studentId"
              element={
                <ProtectedRoute>
                  <StudentsResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students/:studentId/courses"
              element={
                <ProtectedRoute>
                  <StudentCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId/students"
              element={
                <ProtectedRoute>
                  <CourseStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments"
              element={
                <ProtectedRoute>
                  <DepartmentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-department"
              element={
                <ProtectedRoute>
                  <RegisterDepartment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  <MyCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-grades"
              element={
                <ProtectedRoute>
                  <MyGrade />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

const ulStyle = {
  listStyle: "none",
  padding: "20px 0",
  margin: 0,
  display: "flex",
  flexDirection: "column",
};

const logoStyle = {
  padding: "20px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const logoTextStyle = {
  color: "#fff",
  margin: 0,
  textAlign: "center",
};

const logoutContainerStyle = {
  position: "fixed",
  bottom: 0,
  width: "250px",
  padding: "20px",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  boxSizing: "border-box",
};

const logoutButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold",
  transition: "background-color 0.3s",
};

export default App;
