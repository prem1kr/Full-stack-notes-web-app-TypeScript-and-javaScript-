import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/home/Dashboard";
import Notes from "./pages/notes/Notes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="notes" element={<Notes/>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
