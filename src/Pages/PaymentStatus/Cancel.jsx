import "./paymentStatus.css";
import React from "react";
import img from '../../Assets/payment-cancel.png'
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-status-container">
      <div className="payment-status-card cancel">
        <div className="payment-status-clipart">
          <img
            src={img}
            alt="Payment Cancelled"
          />
        </div>
        <h1 className="payment-status-title">Payment Cancelled</h1>
        <p className="payment-status-message">
          Your payment could not be processed or was cancelled. You can try again or explore other products.
        </p>

        <div className="payment-status-actions">
          <button onClick={() => navigate("/cart")} className="btn-primary cancel-btn">
            Try Payment Again
          </button>
          <button onClick={() => navigate("/")} className="btn-secondary cancel-outline">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
