import React from 'react'
import { useNavigate } from 'react-router-dom';
import img from '../../../Assets/404-error.png'
import './UtilityError.css'
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="utility-error" style={{minHeight:'100vh'}}>
      <img src={img} alt="Page not found" className="utility-error-img-2" loading='lazy'/>
      <h2>PAGE NOT FOUND</h2>
      <p>We're sorry, but the page you're looking for is currently unavailable.</p>
       <button onClick={()=>navigate('/')}>Go to home</button>
    </div>
  );
}

export default PageNotFound