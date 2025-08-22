import React, { useCallback, useEffect, useState, useMemo } from "react";
import "./OrderHistory.css";
import axios from "axios";
import Loading from "../../Utility/Loading/Loading";
import CommonError from "../../Utility/ErrorStates/CommonError";
import OrderCard from "./OrderCard/OrderCard";
import { toast } from "react-toastify";
import EmptySate from "../../../Components/Utility/ErrorStates/EmptyState";
import NoProductFound from "../../Utility/ErrorStates/NoProductFound";

const OrderHistory = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/seller/orders`,
        {
          headers: {
            Authorization: localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            ),
          },
        }
      );

      setOrderData(res.data);
    } catch (error) {
      setError(error.response?.data || "Network Error");
      console.log(error);
    }
    setLoading(false);
  }, []);

  const handleConfirmUpdate = async (orderId, status) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/seller/orders/`,
        { status, orderId },
        {
          headers: {
            Authorization: localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            ),
          },
        }
      );
      toast.success(res.data);
      fetchOrder(); // refresh after update
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const filteredOrders = useMemo(() => {
    let filtered = [...orderData];
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    // return orderData.filter((order) =>
    // order.status?.toLowerCase().includes(search.toLowerCase())
    // );
    return filtered;
  }, [orderData, statusFilter]);
  
  return (
    <div className="order-history">
      <h2>Order History</h2>
      <div className="order-filters">
        <p>Select Status</p>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <p className="orders-length">{filteredOrders.length} ORDER FOUND</p>

      {loading ? (
        <Loading />
      ) : error ? (
        <CommonError message={error} />
      ) : orderData.length === 0 ? (
        <EmptySate headMsg={"No orders found"} />
      ) : filteredOrders.length === 0 ? (
        <NoProductFound />
      ) : (
        <div className="order-card-grid">
          {filteredOrders.map((order, index) => (
            <OrderCard
              key={order._id || index}
              order={order}
              handleConfirmUpdate={handleConfirmUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
