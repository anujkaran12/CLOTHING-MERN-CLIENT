import React from "react";
import "./UtilityError.css";
import img from '../../../Assets/network-connection.png'
const CommonError = ({ message }) => {
  return (
    <div className="utility-error">
      <img
        src={img}
        alt="Network Error"
        className="utility-error-img"
        loading='lazy'
      />
      <h2>{message}</h2>
      <p> Please check your internet connection and try again.</p>

     
    </div>
  );
};

export default CommonError;
