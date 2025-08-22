import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import VerifyCode from "./VerifyCode";
import Loading from "../../Components/Utility/Loading/Loading";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = ({ setLoginForm, setShowGoogleBtn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordHide, setPasswordhide] = useState(true);
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    role: "buyer",
    address: "",
  });

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim() ||
      !formData.mobile.trim() ||
      !formData.address.trim()
    ) {
      return toast.warn("Some fields is missing");
    }
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      return toast.warn("Password should be match");
    }

    //

    await sendMail();
  };

  //method for send mail
  const sendMail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/send-verification-code`,
        { email: formData.email.trim(), code: verificationCode }
      );
      if (res) {
        console.log(res);
        setVerificationCode(res.data.verificationCode.toString());
        setIsCodeSend(true);
        toast.success("Verification code send");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data || "Network error");
      setIsCodeSend(false);
    }
    setLoading(false);
  }, [formData.email]);

  const onVerify = useCallback(
    async (inputCode) => {
      setLoading(true);
      if (!inputCode) {
        toast.error("Please enter verification code");
      }
      if (inputCode === verificationCode) {
        await dispatch(registerUser(formData));
        setLoginForm(true);
        setIsCodeSend(false);
        toast.success("Now login to continue");
      } else {
        toast.error("Verification didn't match");
      }
      setLoading(false);
    },
    [dispatch, formData, navigate, setIsCodeSend, verificationCode]
  );

  return (
    <>
      {isCodeSend ? (
        <VerifyCode
          onVerify={onVerify}
          setIsCodeSend={setIsCodeSend}
          sendMail={sendMail}
          loading={loading}
        />
      ) : (
        <form onSubmit={onRegisterSubmit}>
          <h2>Join Us</h2>
          <p className="subtitle">Create your account to get started</p>
          {/* Buyer / Seller Toggle */}
          <div className="role-toggle">
            <button
              type="button"
              className={formData.role === "buyer" ? "active" : ""}
              onClick={() => {
                setShowGoogleBtn(true)
                setFormData({ ...formData, role: "buyer" })}}
              disabled={loading}
            >
              Buyer
            </button>
            <button
              type="button"
              className={formData.role === "seller" ? "active" : ""}
              onClick={() => {
                setShowGoogleBtn(false);
                setFormData({ ...formData, role: "seller" });
              }}
              disabled={loading}
            >
              Seller
            </button>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="fullName"
              required
              onChange={onChangeInput}
              placeholder=""
              value={formData.fullName}
              disabled={loading}
            />
            <label>Full name</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              required
              onChange={onChangeInput}
              placeholder=""
              value={formData.email}
              disabled={loading}
            />
            <label>Email</label>
          </div>

          <div className="reg-d-flex">
            <div className="form-group">
              <input
                type="password"
                minLength="6"
                name="password"
                required
                onChange={onChangeInput}
                placeholder=""
                value={formData.password}
                disabled={loading}
              />
              <label>Password</label>
            </div>

            <div className="form-group">
              <input
                type={passwordHide ? "password" : "text"}
                minLength="6"
                name="confirmPassword"
                required
                onChange={onChangeInput}
                placeholder=""
                value={formData.confirmPassword}
                disabled={loading}
              />
              <label>Confirm Password</label>
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
          </div>

          <div className="form-group">
            <input
              type="text"
              name="address"
              required
              onChange={onChangeInput}
              placeholder=""
              value={formData.address}
              disabled={loading}
            />
            <label>Address</label>
          </div>
          <div className="form-group form-group-prefix">
            <span className="prefix">+91</span>
            <input
              type="tel"
              name="mobile"
              required
              onChange={onChangeInput}
              placeholder=""
              pattern="[0-9]{10}"
              maxLength="10"
              value={formData.mobile}
              disabled={loading}
            />
            <label>Mobile number</label>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </button>
          <span>or</span>
        </form>
      )}
    </>
  );
};

export default Register;
