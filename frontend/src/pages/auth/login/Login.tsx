import React, { useState } from "react";
import axios from "axios";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom"; 
import "../../styles/auth/login/Login.css";
import img from "../../../assets/image.jpg";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    remember: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSendOtp = async () => {
    if (!formData.email) return alert("Please enter your email");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/send-otp", {
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

  const handleVerifyOtp = async () => {
    if (!formData.otp) return alert("Enter the OTP you received");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email: formData.email,
        otp: formData.otp,
        remember: formData.remember,
      });

      if (res.data.user?.id && res.data.token) {
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("token", res.data.token);
      }

      alert(res.data.message);
      navigate("/dashboard"); 
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      return alert("Google login failed. Please try again.");
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/google-signup", {
        token: credentialResponse.credential,
      });

      if (res.data.user?.id && res.data.token) {
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("token", res.data.token);
      }

      alert(res.data.message);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider >
      <div className="login-container">
        <div className="logo">
          <span className="spinner"></span>
          <span className="logo-text">HD</span>
        </div>

        <div className="login-left">
          <h2 className="title">Sign in</h2>
          <p className={`subtitle ${otpSent ? "hidden-subtitle" : ""}`}>
            Please login to continue to your account.
          </p>

          <div
            className="form-box"
            style={{ marginTop: otpSent ? "20%" : "5%" }}
          >
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="jonas_kahnwald@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {otpSent && (
              <>
                <label>OTP</label>
                <div className="otp-input-group">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    maxLength={6}
                  />
                  <button
                    type="button"
                    className="resend-btn"
                    onClick={handleSendOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}

            <div className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label>Keep me logged in</label>
            </div>

            <button
              type="button"
              onClick={otpSent ? handleVerifyOtp : handleSendOtp}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Loading..." : otpSent ? "Sign in" : "Get OTP"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => alert("Google Login Failed")}
            />
          </div>

          <p className="footer">
            Need an account?{" "}
            <Link to="/signup" className="signup-link">
              Create one
            </Link>
          </p>
        </div>

        <div className="login-right">
          <img src={img} alt="Wallpaper" />
          <div className="hero-overlay">
            <h1 className="hero-text">Welcome to HD</h1>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
