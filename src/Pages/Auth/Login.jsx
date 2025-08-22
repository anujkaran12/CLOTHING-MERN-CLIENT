import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUserData } from "../../redux/userSlice";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [ForgetPasswordClick, setForgetPassordClick] = useState(false);

  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [passwordHide, setPasswordhide] = useState(true);
  const navigate = useNavigate();
  const onLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        return toast.warn("Some fields is missing");
      }
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
          formData
        );
        localStorage.setItem(
          process.env.REACT_APP_LOCALSTORAGE_KEY,
          res.data.JWT_TOKEN
        );
        
        navigate("/");
        toast.success("Login Successfully");
        await dispatch(fetchUserData());
      } catch (error) {
        
        toast.error(error.response?.data || "Network error");
      }
      setLoading(false);
    },
    [dispatch, formData, navigate]
  );

  const onResetPassword = useCallback(async (email) => {
    try {
      if (!email.trim()) {
        return toast.error("Enter email address");
      }
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`,
        { email }
      );
      if (res) {
        toast.success(res.data);
      }
    } catch (error) {
      
      toast.error(error.response?.data || "Network error");
    }
    setLoading(false);
  }, []);
  return (
    <>
      {ForgetPasswordClick ? (
        <ForgotPassword onResetPassword={onResetPassword} loading={loading} setForgetPassordClick={setForgetPassordClick} />
      ) : (
        <form onSubmit={(e) => onLogin(e)}>
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to access your account</p>

          <div className="form-group">
            <input
              type="email"
              required
              name="email"
              onChange={(e) => onChangeInput(e)}
              placeholder=""
              disabled={loading}
            />
            <label htmlFor="">Email</label>
          </div>
          <div className="form-group">
            <input
              type={passwordHide ? "password" : "text"}
              minLength="6"
              name="password"
              required
              onChange={(e) => onChangeInput(e)}
              placeholder=""
              disabled={loading}
            />

            <label htmlFor="">Password</label>
            {passwordHide ? (
              <i
                className="bi bi-eye"
                onClick={() => setPasswordhide(!passwordHide)}
              ></i>
            ) : (
              <i
                className="bi bi-eye-slash"
                onClick={() => setPasswordhide(!passwordHide)}
              ></i>
            )}
          </div>
          <div className="toggle-form forgot-pass-text">
            <p onClick={()=>setForgetPassordClick(true)}>Forgot password?</p>
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <span>or</span>
        </form>
      )}
    </>
  );
};

export default Login;
