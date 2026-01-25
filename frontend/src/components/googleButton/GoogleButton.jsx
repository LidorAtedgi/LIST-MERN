import React from "react";
import "./GoogleButton.css";

const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "https://list-mern-ppx8.onrender.com/api/auth/google";
  };

  return (
    <button className="google-btn" onClick={handleGoogleLogin}>
      <img
        src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
        alt="Google Logo"
        className="google-logo"
      />
      Google
    </button>
  );
};

export default GoogleButton;
