import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordHide, setPasswordHide] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match");
    }
    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/reset-password`,
        {
          email,
          token,
          newPassword: form.password,
        }
      );

      toast.success(res.data);
      setTimeout(() => navigate("/auth"), 1000);
    } catch (err) {
      setMessage(err.response?.data || "Network error");
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Password</h2>
        {message && <p className="reset-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="reset-input-group">
            <label htmlFor="password">New Password</label>
            <div className="password-wrapper">
              <input
                type={passwordHide ? "password" : "text"}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
                disabled={loading}
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordHide(!passwordHide)}
              >
                {passwordHide ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
              </span>
            </div>
          </div>

          <div className="reset-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={passwordHide ? "password" : "text"}
                name="confirmPassword"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                disabled={loading}
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordHide(!passwordHide)}
              >
                {passwordHide ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
              </span>
            </div>
          </div>

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
