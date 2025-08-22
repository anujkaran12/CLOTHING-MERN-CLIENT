import React, { useEffect } from "react";
import "./OverlayPayment.css";
import { toast } from "react-toastify";
import Loading from "../Utility/Loading/Loading";

const OverlayPayment = ({
  isOpen,
  total = 0,
  currency = "₹",
  onClose = () => {},
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
