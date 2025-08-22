import React, { useEffect, useState } from "react";
import "./Orders.css";

import axios from "axios";
import Loading from "../../Components/Utility/Loading/Loading";
import CommonError from "../../Components/Utility/ErrorStates/CommonError";
import EmptyState from "../../Components/Utility/ErrorStates/EmptyState";
import { useSelector } from "react-redux";

import NotLoggedIn from "../../Components/Utility/ErrorStates/NotLoggedIn";
import UserSpecificPageError from "../../Components/Utility/ErrorStates/UserSpecificPageError";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    error: userError,
    loading: userLoading,
    userData,
  } = useSelector((state) => state.userReducer);
  

  const fetchOrders = async (req, res) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/orders`,
        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );
      setOrders(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.response?.data || "Network error");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-orders-container">
      {userLoading ? (
        <Loading />
      ) : userError ? (
        <NotLoggedIn />
      ) : !userData ? (
        <NotLoggedIn />
      ) :userData.role==='seller'?<UserSpecificPageError user="buyer"/>: (
        <>
          <h1>My Orders</h1>
          {loading ? (
            <Loading />
          ) : error ? (
            <CommonError message={error} />
          ) : orders.length === 0 ? (
            <EmptyState
              headMsg={"No orders found"}
              message={"Shop and explore some new products."}
              btnHandler={true}
            />
          ) : (
            <>
              {" "}
              {orders.map((order) => (
                <div key={order._id} className="user-order-card">
                  {/* Order Date */}
                  <div className="user-order-date">
                    <p>Order Date: {formatDate(order.createdAt)}</p>
                  </div>

                  {/* Address */}
                  <div className="user-order-address">
                    <h4>Delivery Address</h4>
                    <p>{order.address}</p>
                  </div>

                  {/* Product */}
                  <div className="user-order-product">
                    <img
                      src={order.product.thumbnail.secure_url}
                      alt={order.product.title}
                      className="user-order-image"
                    />
                    <div className="user-order-product-info">
                      <h5>{order.product.name}</h5>
                      <p>Price: ₹{order.price}</p>
                      <p>Quantity: {order.quantity}</p>
                      <p>Size: {order.size.toUpperCase()}</p>
                      <p>Color: {order.color.toUpperCase()}</p>
                      <p>Payment Mode: {order.paymentMode.toUpperCase()}</p>
                      <p
                        className={`user-order-status user-status-${order.status.toLowerCase()}`}
                      >
                        Status: {order.status}
                      </p>
                      <p>Total Amount: ₹{order.totalAmount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
