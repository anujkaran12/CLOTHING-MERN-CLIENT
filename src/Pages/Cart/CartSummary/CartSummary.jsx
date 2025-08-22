import "./CartSummary.css";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const CartSummary = ({ onProceedHandler, setTotal, address, setAddress }) => {
  const { cartProducts } = useSelector((state) => state.cartReducer);

  // Controlled state for address input

  const [editing, setEditing] = useState(false);
  // console.log(userData.address)
  // ✅ Memoized calculation to avoid recalculating on every render
  const { subtotal, coupon, discount, deliveryCharge, totalPrice } =
    useMemo(() => {
      const subtotalValue = cartProducts.reduce(
        (total, item) =>
          total +
          (item.product.discountPrice || item.product.price) * item.quantity,
        0
      );
      const couponValue = subtotalValue * 0.02;
      const discountValue = subtotalValue / 20;
      const delivery = cartProducts.length === 0 ? 0 : 70;
      const total = subtotalValue + delivery - discountValue - couponValue;

      return {
        subtotal: subtotalValue,
        coupon: couponValue,
        discount: discountValue,
        deliveryCharge: delivery,
        totalPrice: total,
      };
    }, [cartProducts]);

  useEffect(() => {
    setTotal(totalPrice);
  }, [setTotal, totalPrice]);
  // ✅ Wrapped handlers in useCallback to prevent re-creation
  const toggleEdit = useCallback((e) => {
    e.preventDefault();
    setEditing((prev) => !prev);
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
        <button onClick={toggleEdit}>
          {editing ? "Save" : address?.trim() ? "Edit" : "Add address"}
        </button>
      </form>

      <hr />

      {/* Coupon Section */}
      <div>
        <form className="form-coupon" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Enter coupon code" />
          <button>Apply</button>
        </form>
        <label>eg: SAVE20</label>
      </div>

      {/* Summary Details */}
      <div className="summary-details">
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>₹ {subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Apply Coupon:</span>
          <span>- ₹ {coupon.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Discount:</span>
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
