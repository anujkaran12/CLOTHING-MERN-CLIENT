import React, { useState } from "react";

const OrderCard = ({ order, handleConfirmUpdate }) => {
  const [statusChanges, setStatusChanges] = useState(order.status); // temporary selections
  const handleSelectChange = (newStatus) => {
    setStatusChanges(newStatus);
  };

  return (
    <>
      <div className="order-card" key={order._id}>
        <div className="order-img">
          <img
            src={order.product.thumbnail.secure_url}
            alt={order.product.title}
          />
        </div>

        <div className="order-details">
          <h3 title={order.product.title}>{order.product.title}</h3>
          <p>
            <strong>Price:</strong> ₹{order.price}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {/* status with dropdown + confirm button */}
          <div className="order-status">
            <label>Status:</label>
            <select
              className={`status-select ${statusChanges.toLowerCase()}`}
              value={statusChanges}
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {statusChanges !== order.status && (
              <button
                className="status-update-btn"
                onClick={() => handleConfirmUpdate(order._id, statusChanges)}
              >
                Update
              </button>
            )}
          </div>
        </div>

        <div className="buyer-info">
          <h4>Buyer Info</h4>
          <p>
            <strong>Name:</strong> {order.buyer.fullName}
          </p>
          <p>
            <strong>Email:</strong> {order.buyer.email}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.address}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
