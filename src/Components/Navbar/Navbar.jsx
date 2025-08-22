import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { fetchUserData, logout } from "../../redux/userSlice";
import { useConfirmation } from "../../Context/OverlayContext";
import { fetchCart, setCart } from "../../redux/cartSlice";
import { fetchWishlist, setWishlist } from "../../redux/wishlistSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { showConfirmation } = useConfirmation();

  const { userData } = useSelector((s) => s.userReducer);
  const { cartProducts } = useSelector((s) => s.cartReducer);
  const { wishlistProducts } = useSelector((s) => s.wishlistReducer);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    dispatch(logout());
    dispatch(fetchUserData());
    dispatch(setCart([]));
    dispatch(setWishlist([]));
    navigate("/");
  }, [dispatch]);

  return (
    <div className="navbar-container">
      {/* Logo */}
      <div className="nav-logo">WEAR LOOM</div>

      <div className={`nav-categories ${menuOpen ? "active" : ""}`}>
        <Link to="/Explore?cat=all" onClick={closeMenu}>
          All
        </Link>
        <Link to="/Explore?cat=men" onClick={closeMenu}>
          Men
        </Link>
        
        <Link to="/Explore?cat=women" onClick={closeMenu}>
          Women
        </Link>
        
        <Link to="/Explore?cat=kid" onClick={closeMenu}>
          Kids
        </Link>
       
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li onClick={closeMenu}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/Explore">Shop</Link>
        </li>

        {userData?.role === "seller" && (
          <li onClick={closeMenu}>
            <Link to="/seller">Seller Dashboard</Link>
          </li>
        )}
        {(!userData || userData.role === "buyer") && (
          <>
            <li onClick={closeMenu}>
              <Link to="/Wishlist">Wishlist ({wishlistProducts.length})</Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/Cart">Cart ({cartProducts.length})</Link>
            </li>
          </>
        )}
        <li onClick={closeMenu}>
          <Link to="/Profile">Profile</Link>
        </li>

        {userData?._id ? (
          <li
            onClick={() => {
              closeMenu();
              showConfirmation(
                "Logout",
                "Are you sure you want to logout?",
                handleLogout,
                "Cancel",
                "Yes, logout"
              );
            }}
          >
            <Link className="logout-btn">Logout</Link>
          </li>
        ) : (
          <li onClick={closeMenu}>
            <Link to="/Auth">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
