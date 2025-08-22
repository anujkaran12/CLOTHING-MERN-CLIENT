import React from "react";
import "./UtilityError.css";
import img from "../../../Assets/binoculars.png";
const NoProductFound = ({ headMsg,message, btnHandler }) => {
  return (
    <div className="utility-error">
      <img src={img} alt="No Product Found" className="utility-error-img" loading='lazy' />
      <h2>{headMsg || "No Products Found"}</h2>
      <p>
        {message || "We couldn't find any products matching your criteria."}
      </p>
      {btnHandler ? <button>Explore</button> : <></>}
    </div>
  );
};

export default NoProductFound;
