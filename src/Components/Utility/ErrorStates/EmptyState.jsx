import React from "react";
import "./UtilityError.css";
import img from '../../../Assets/emptyCart.png'
import { useNavigate } from "react-router-dom";
const EmptyState = ({headMsg,message}) => {
  const navigate = useNavigate();
  return (
    <div className="utility-error">
      <img src={img} alt="No Product Found" className="utility-error-img" loading='lazy' />
      <h2>{headMsg} !</h2>
      <p>{message}</p>
       <button onClick={()=>navigate('/Explore')}>Explore</button>
    </div>
  );
};

export default EmptyState;
