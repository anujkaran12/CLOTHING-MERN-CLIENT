import React from "react";
import "./OverlayPayment.css";
import Loading from "../Utility/Loading/Loading";

const OverlayPayment = ({
  cartItems = [],
  address = {},
  total = 0,
  currency = "₹",
  loading = false,
  title = "Confirm & Pay",
  setCheckout,
  handlePayment,
  handleCOD,
  orderPlacedLoading,
}) => {
  return (
    <div className="op-backdrop" role="dialog" aria-modal="true">
      <div className="op-card" onMouseDown={(e) => e.stopPropagation()}>
        {orderPlacedLoading ? (
          <Loading messge={"Processing..."} />
        ) : (
          <>
            <header className="op-header">
              <h3 className="op-title">{title}</h3>
              <button
                className="op-close"
                aria-label="Close"
                onClick={() => setCheckout(false)}
                disabled={loading}
              >
                ✕
              </button>
            </header>

            <div className="op-body">
              <section className="op-section">
                <h4>Shipping Address</h4>
                
                <p>
                {address}
                </p>
                <p>{address.country}</p>
              </section>

              <section className="op-section">
                <h4>Cart Items</h4>
                <ul className="op-cart-items">
                  {cartItems.map((item, index) => (
                    <li key={index} className="op-cart-item">
                      <img
                        src={item.product.thumbnail.secure_url}
                        alt={item.product.title}
                        className="op-cart-item-image"
                      />
                      <div className="op-cart-item-details">
                        <span className="op-cart-item-name">
                          {item.product.title} x {item.quantity}
                        </span>
                        <span className="op-cart-item-price">
                          {currency}
                          {(item.product.discountPrice || item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="op-row">
                <span className="op-label">Total Payable</span>
                <span className="op-amount">
                  {currency}
                  {Number(total).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <p className="op-note">Choose how you’d like to pay:</p>

              <div className="op-actions">
                <button
                  className="op-btn op-btn-outline"
                  onClick={handleCOD}
                  disabled={loading}
                >
                  Pay with COD
                </button>

                <button
                  className="op-btn op-btn-primary"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  Pay Online
                </button>
              </div>

              {loading && (
                <div className="op-loading" aria-live="polite">
                  Processing…
                </div>
              )}
            </div>

            <footer className="op-footer">
              <small className="op-policy">
                By continuing, you agree to our Terms & Refund Policy.
              </small>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default OverlayPayment;
