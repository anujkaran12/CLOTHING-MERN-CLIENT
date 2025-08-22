import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../Assets/shopping.png";
import './UtilityError.css'
const NotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="utility-error" >
      <img src={img} alt="Page not found" className="utility-error-img-2" loading='lazy' />
      <h2>You are not logged in</h2>
      <p>Please login to continue</p>
      <button onClick={() => navigate("/auth")}>Login/Sign up</button>
    </div>
  );
};

export default NotLoggedIn;
