import React from "react";

interface OtpVerificationProps {
  otp: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerifyOtp: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ otp, loading, onChange, onVerifyOtp }) => {
  return (
    <>
      <input
        type="text"
        name="otp"
        value={otp}
        placeholder="Enter OTP"
        className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        onChange={onChange}
      />
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition disabled:opacity-50"
        onClick={onVerifyOtp}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP & Signup"}
      </button>
    </>
  );
};

export default OtpVerification;
