import React from "react";
import "./UtilityError.css";
import buyer from "../../../Assets/buyer.png";
import seller from "../../../Assets/seller.png";
 const UserSpecificPageError = ({ user }) => {
  return (
    <div className="utility-error">
      <img
        src={user === "buyer" ? buyer : seller}
        alt="Page not found"
        className="utility-error-img-2"
        loading="lazy"
      />
      <h2>This route is for buyer's only</h2>
      
      {/* <button onClick={() => navigate("/auth")}>Login/Sign up</button> */}
    </div>
  );
};

export default UserSpecificPageError