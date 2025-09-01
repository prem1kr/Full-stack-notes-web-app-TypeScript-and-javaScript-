import React from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/styles/navbar/Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/dashboard"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="spinner-container">
          <div className="spinner"></div>
          <span className="spinner-text">HD</span>
        </div>
      </div>
      <div className="navbar-right">
        <button className="home-btn" onClick={goHome}>
          Home
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
