import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../redux/userSlice";

function GoogleSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // Send to backend

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
        {
          token,
        }
      );
      localStorage.setItem(
        process.env.REACT_APP_LOCALSTORAGE_KEY,
        res.data.JWT_TOKEN
      );
      toast.success(res.data.msg);
      navigate("/");
      dispatch(fetchUserData());
    } catch (error) {
      toast.error(error.response.data || "Network error");
      console.log(error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
}
export default GoogleSignup;
