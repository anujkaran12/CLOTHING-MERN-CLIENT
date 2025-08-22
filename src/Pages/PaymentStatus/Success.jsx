import axios from "axios";
import "./paymentStatus.css";
import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrderInDB } from "../../utility/placeOrder";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Utility/Loading/Loading";
import { fetchUserData } from "../../redux/userSlice";
import img from "../../Assets/delivery-truck.png";
import NotLoggedIn from "../../Components/Utility/ErrorStates/NotLoggedIn";
import UserSpecificPageError from "../../Components/Utility/ErrorStates/UserSpecificPageError";

const Success = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const address = searchParams.get("address");
  const [loading, setLoading] = useState(false);
  const { cartProducts } = useSelector((state) => state.cartReducer);
  const {
    userData,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  // checking payment status buy sessionID
  const checkPaymentStatus = async () => {
    setLoading(true);
    try {
      
    
    const { data: session } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/checkout-session/${sessionId}`,
      {
        headers: {
          Authorization: localStorage.getItem(
            `${process.env.REACT_APP_LOCALSTORAGE_KEY}`
          ),
        },
      }
    );
    if (session.payment_status === "paid") {
      const orderSuccess = await placeOrderInDB(cartProducts, address, "STRIPE");
      if(orderSuccess){

        await dispatch(fetchUserData());
      }
    } else {
      toast.error("Payment not paid yet");
    }
    } catch (error) {
      
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sessionId && address && userData && cartProducts.length !== 0) {
      checkPaymentStatus();
    }
  }, [address, sessionId, userData]);

  return (
    <div className="payment-status-container">
      {loading || userLoading ? (
        <Loading />
      ) : userError ? (
        <NotLoggedIn />
      ) : !userData ? (
        <NotLoggedIn />
      ) : userData.role === "seller" ? (
        <UserSpecificPageError user="buyer" />
      ) : (
        <div className="payment-status-card">
          <div className="payment-status-clipart">
            <img src={img} alt="Order Placed" />
          </div>
          <h1 className="payment-status-title">Order Placed Successfully!</h1>
          <p className="payment-status-message">
            Thank you for shopping with us. We’ll notify you when your order is
            on its way!
          </p>

          <div className="payment-status-actions">
            <button onClick={() => navigate("/orders")} className="btn-primary">
              View My Orders
            </button>
            <button onClick={() => navigate("/")} className="btn-secondary">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
