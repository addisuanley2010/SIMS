// AuthContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [user_id, setUser_id] = useState("");

    const [isDialogOpen, setDialogOpen] = useState(false);

    const login = (user) => {
        setIsAuthenticated(true);
        setUsername(user.username);
        setRole(user.role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername("");
        setRole("");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{isDialogOpen,setDialogOpen, isAuthenticated, setIsAuthenticated, username, role, setUsername, setRole, login, logout,user_id,setUser_id }}>
            {children}
        </AuthContext.Provider>
    );
};