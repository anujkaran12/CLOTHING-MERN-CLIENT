import "./CartSummary.css";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const CartSummary = ({ onProceedHandler, setTotal, address, setAddress }) => {
  const { cartProducts } = useSelector((state) => state.cartReducer);

  const [editing, setEditing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState("");

  // ✅ Coupon logic
  const availableCoupons = {
    SAVE20: 0.2, // 20% off
    SAVE10: 0.1, // 10% off
    FREESHIP: "freeship", // free delivery
  };

  const { subtotal, discount, deliveryCharge, couponDiscount, totalPrice } =
    useMemo(() => {
      const subtotalValue = cartProducts.reduce(
        (total, item) =>
          total +
          (item.product.discountPrice || item.product.price) * item.quantity,
        0
      );

      let delivery = cartProducts.length === 0 ? 0 : 70;
      let couponValue = 0;

      if (appliedCoupon) {
        if (typeof availableCoupons[appliedCoupon] === "number") {
          couponValue = subtotalValue * availableCoupons[appliedCoupon];
        } else if (availableCoupons[appliedCoupon] === "freeship") {
          delivery = 0;
        }
      }

      const discountValue = subtotalValue * 0.05; // default 5% discount
      const total = subtotalValue + delivery - discountValue - couponValue;

      return {
        subtotal: subtotalValue,
        discount: discountValue,
        deliveryCharge: delivery,
        couponDiscount: couponValue,
        totalPrice: total,
      };
    }, [cartProducts, appliedCoupon]);

  useEffect(() => {
    setTotal(totalPrice);
  }, [setTotal, totalPrice]);

  const toggleEdit = useCallback((e) => {
    e.preventDefault();
    setEditing((prev) => !prev);
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (availableCoupons[code]) {
      setAppliedCoupon(code);
      setError("");
    } else {
      setAppliedCoupon(null);
      setError("Invalid coupon code");
    }
  };

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>

      {/* Address Form */}
      <form className="form-address">
        <label>ADDRESS</label>
        {!editing ? (
          <p>{address || "No address added"}</p>
        ) : (
          <textarea value={address} onChange={handleAddressChange} autoFocus />
        )}
        <button type="submit" onClick={toggleEdit}>
          {editing ? "Save" : address?.trim() ? "Edit" : "Add address"}
        </button>
      </form>

      <hr />

      {/* Coupon Section */}
      <div>
        <form
          className="form-coupon"
          onSubmit={(e) => {
            e.preventDefault();
            applyCoupon();
          }}
        >
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button type="submit">Apply</button>
        </form>
        <label>eg: SAVE20, SAVE10, FREESHIP</label>
        {appliedCoupon && (
          <p className="coupon-success">Applied: {appliedCoupon}</p>
        )}
        {error && <p className="coupon-error">{error}</p>}
      </div>

      {/* Summary Details */}
      <div className="summary-details">
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>₹ {subtotal.toFixed(2)}</span>
        </div>
        {appliedCoupon && (
          <div className="summary-item">
            <span>Coupon ({appliedCoupon}):</span>
            <span>- ₹ {couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-item">
          <span>Discount (5%):</span>
          <span>- ₹ {discount.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Charge:</span>
          <span>₹ {deliveryCharge.toFixed(2)}</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Total:</span>
          <span>₹ {totalPrice.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <button className="checkout-button" onClick={() => onProceedHandler()}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
