import { useState } from "react";
import "./Auth.css";

import Register from "./Register";
import Login from "./Login";
import GoogleSignup from "../../utility/GoogleSignup";


const Auth = () => {
  const [loginForm, setLoginForm] = useState(true);
  const [showGoogleBtn, setShowGoogleBtn] = useState(true);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <img src="/LOGO_BLACK_TRANS.png" alt="Wild Stitch Logo" />
          <h1>WILD STITCH</h1>
        </div>

        {/* Form */}
        <div className="auth-form">
          
          {loginForm ? (
            <Login />
          ) : (
            <Register setLoginForm={setLoginForm} setShowGoogleBtn={setShowGoogleBtn} />
          )}

          {showGoogleBtn && <GoogleSignup />}

          <div className="toggle-form">
            <p onClick={() => setLoginForm(!loginForm)}>
              {loginForm
                ? "Create an account | Register!"
                : "Already have an account? Sign in"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
