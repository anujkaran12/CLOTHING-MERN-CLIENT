import "./Cart.css";
import CartSummary from "../Cart/CartSummary/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../redux/cartSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../Components/Utility/ErrorStates/EmptyState";
import OverlayPayment from "../../Components/OverlayPayment/OverlayPayment";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { placeOrderInDB } from "../../utility/placeOrder";
import Loading from "../../Components/Utility/Loading/Loading";
import CommonError from "../../Components/Utility/ErrorStates/CommonError";
import NotLoggedIn from "../../Components/Utility/ErrorStates/NotLoggedIn";
import UserSpecificPageError from "../../Components/Utility/ErrorStates/UserSpecificPageError";
import { toast } from "react-toastify";

const Cart = () => {
  console.log("cart");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    cartProducts,
    loading: cartLoading,
    error: cartError,
  } = useSelector((state) => state.cartReducer);
  const {
    userData,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userReducer);

  const [checkout, setCheckout] = useState(false);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [unavailableItems, setUnavailableItems] = useState([]);
  const[orderPlacedLoading,setOrderPlacedLoading] = useState(false)

  useEffect(() => {
    if (userData?.address) {
      setAddress(userData.address);
    }
  }, [userData]);

  const handleRemove = useCallback(
    (id) => dispatch(removeFromCart(id)),
    [dispatch]
  );

  const handleCOD = useCallback(async () => {
    setOrderPlacedLoading(true)
    const unavailable = await checkCartAvailability();

    if (unavailable.length !== 0) {
      setCheckout(false)
      setOrderPlacedLoading(false)
      return toast.error("Some items were unavailable");
    }

    const orderSuccess = await placeOrderInDB(cartProducts, address, "COD");
    if (orderSuccess) {
      setCheckout(false);
      setOrderPlacedLoading(false)
      navigate("/success");
      dispatch(fetchCart());
    }
  }, [address, cartProducts, dispatch, navigate]);

  const handlePayment = useCallback(async () => {
    setOrderPlacedLoading(true)
    const unavailable = await checkCartAvailability();

    if (unavailable.length !== 0) {
      setCheckout(false)
      setOrderPlacedLoading(false)
      return toast.error("Some items were unavailable");
    }
    try {
      const stripe = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        { amount: total, cartProducts, address, paymentMode: "STRIPE" },
        {
          headers: {
            Authorization: localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            ),
          },
        }
      );

      const { id: sessionId } = data;
      console.log("sessionId - ", sessionId);
      const { error } = await stripe.redirectToCheckout({ sessionId });
      setOrderPlacedLoading(false)
      if (error) console.error(error);
    } catch (err) {
      console.error("Payment error:", err);
      setOrderPlacedLoading(false)
    }
  }, [total]);

  const checkCartAvailability = async () => {
    const cartProductsToBeChecked = cartProducts.map((item) => ({
      productId: item.product._id,
      size: item.size,
      quantity: item.quantity,
    }));

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/cart/check`,
        { cartProductsToBeChecked },
        {
          headers: {
            Authorization: localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            ),
          },
        }
      );

      if (data.length === 0) {
        setUnavailableItems([]);
        return [];
      } else {
        setUnavailableItems(data);
        return data;
      }
    } catch (err) {
      console.error("Error checking cart:", err);
      const errorItem = [
        { productId: null, size: null, status: "Server error, try again." },
      ];
      setUnavailableItems(errorItem);
      return errorItem;
    }
  };

  const onProceedHandler = ()=>{
    if(cartProducts.length === 0){
      return toast.error("Cart is empty")
    }
    if(!address){
      return toast.error("No address found")
    }
    setCheckout(true)
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* // <div> */}
      {userLoading ? (
        <Loading />
      ) : userError ? (
        <NotLoggedIn />
      ) : !userData ? (
        <NotLoggedIn />
      ) : userData.role === "seller" ? (
        <UserSpecificPageError user="buyer" />
      ) : (
        <>
          <div className="cart-container">
            <div className="cart-items">
              <h1 className="cart-title">Your Cart</h1>

              {cartLoading ? (
                <Loading />
              ) : cartError ? (
                <CommonError message={cartError} />
              ) : cartProducts.length === 0 ? (
                <EmptyState
                  message="Looks like you haven’t added anything to your cart yet."
                  headMsg="Your cart is empty"
                />
              ) : (
                cartProducts.map(({ product, size, quantity }) => {
                  const error = unavailableItems.find(
                    (u) => u.productId === product._id
                  );

                  return (
                    <div key={product._id} className="cart-item">
                      <div
                        className="cart-item-details"
                        onClick={() => navigate(`/explore/${product._id}`)}
                      >
                        <img
                          src={product.thumbnail.secure_url}
                          alt={product.title}
                          className="cart-item-image"
                        />
                        <div className="cart-item-info">
                          <h2 className="cart-item-title">{product.title}</h2>
                          <p>
                            Colour: <span>{product.color}</span>
                          </p>
                          <p>
                            Size: <span>{size}</span>
                          </p>
                          <p>
                            Quantity: <span>{quantity}</span>
                          </p>
                          {error && (
                            <span className="cart-item-error">
                              ❌ {error.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="cart-item-price">
                        <span>₹{product.discountPrice || product.price}</span>
                      </div>

                      <button
                        className="cart-remove-btn"
                        onClick={() => handleRemove(product._id)}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <CartSummary
              onProceedHandler={onProceedHandler}
              setTotal={setTotal}
              address={address}
              setAddress={setAddress}
            />

            {checkout && (
              <OverlayPayment
                setCheckout={setCheckout}
                handlePayment={handlePayment}
                handleCOD={handleCOD}
                total={total}
                orderPlacedLoading={orderPlacedLoading}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
