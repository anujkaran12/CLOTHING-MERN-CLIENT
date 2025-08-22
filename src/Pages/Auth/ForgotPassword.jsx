import React, { useState } from "react";

const ForgotPassword = ({ onResetPassword,loading,setForgetPassordClick }) => {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onResetPassword(email)
      }}
    >
      <h2>Forgot Password</h2>
      <p className="subtitle">
        Enter your email address for getting reset link
      </p>
      <div className="form-group">
        <input
          type="email"
          required
          name="email"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <label>Enter email</label>
      </div>
       <div className="toggle-form forgot-pass-text">
            <p onClick={()=>setForgetPassordClick(false)}>Go back to login!</p>
          </div>
      <button type="submit" className="auth-btn" disabled={loading}>
        {loading?"Loading...":'Reset Password'}
      </button>
      <span>or</span>
    </form>
  );
};

export default ForgotPassword;
