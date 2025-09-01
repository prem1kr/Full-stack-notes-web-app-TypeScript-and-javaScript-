import React, { useState, useEffect } from "react";
import "../../styles/auth/signup/SignupForm.css";

interface SignupFormProps {
  formData: {
    name: string;
    dob: string;
    email: string;
    otp: string;
  };
  otpSent: boolean; 
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendOtp: () => Promise<void>;
  onSignup: () => Promise<void>;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  otpSent,
  loading,
  onChange,
  onSendOtp,
  onSignup,
}) => {
  const [localOtpSent, setLocalOtpSent] = useState(otpSent);

  useEffect(() => {
    setLocalOtpSent(otpSent);
  }, [otpSent]);

  const handleSendOtp = async () => {
    await onSendOtp();
    setLocalOtpSent(true);
  };

  const handleSignup = async () => {
    await onSignup();
  };

  return (
    <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
      <label>Your Name</label>
      <input
        type="text"
        name="name"
        placeholder="Jonas Khanwald"
        value={formData.name}
        onChange={onChange}
        required
      />

      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={onChange}
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="jonas_kahnwald@gmail.com"
        value={formData.email}
        onChange={onChange}
        required
      />

      {!localOtpSent ? (
        <button type="button" onClick={handleSendOtp} disabled={loading}>
          {loading ? "Sending..." : "Get OTP"}
        </button>
      ) : (
        <>
          <label>Enter OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={onChange}
            required
          />

          <button
            type="button"
            onClick={handleSignup}
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
