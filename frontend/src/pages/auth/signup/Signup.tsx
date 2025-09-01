import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import SignupForm from "./SignupForm";
import "../../styles/auth/signup/Signup.css";
import img from "../../../assets/image.jpg";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) return alert("Please enter your email");
    setLoading(true);
    try {
      const res = await axios.post("https://notes-backend-63wv.onrender.com/api/send-otp", {
        email: formData.email,
      });
      alert(res.data.message);
      setOtpSent(true); 
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!formData.otp) return alert("Enter the OTP you received");
    setLoading(true);
    try {
      const res = await axios.post("https://notes-backend-63wv.onrender.com/api/verify-otp", {
        email: formData.email,
        otp: formData.otp,
        name: formData.name,
        dob: formData.dob,
      });
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-logo">
          <span className="spinner"></span>
          <span className="logo-text">HD</span>
        </div>

        <h2 className="signup-title">Sign up</h2>
        <p className="signup-subtitle">
          Sign up to unlock all the features of <span>HD</span>.
        </p>

        <div className="signup-box">
          <SignupForm
            formData={formData}
            loading={loading}
            otpSent={otpSent}
            onChange={handleChange}
            onSendOtp={handleSendOtp}
            onSignup={handleSignup}
          />
        </div>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login" className="signin-link"> 
            Sign in
          </Link>
        </p>
      </div>

      <div className="signup-right">
        <img src={img} alt="Signup Hero" className="hero-img" />
        <div className="hero-overlay">
          <h1 className="hero-text">Welcome to HD</h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
