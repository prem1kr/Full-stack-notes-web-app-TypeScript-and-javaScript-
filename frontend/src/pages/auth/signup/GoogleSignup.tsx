import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface GoogleSignupProps {
  onGoogleSignup: (response: CredentialResponse) => void;
}

const GoogleSignup: React.FC<GoogleSignupProps> = ({ onGoogleSignup }) => {
  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={onGoogleSignup}
        onError={() => alert("Google Signup Failed")}
      />
    </div>
  );
};

export default GoogleSignup;
