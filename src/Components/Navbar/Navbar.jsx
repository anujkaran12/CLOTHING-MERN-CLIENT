import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { fetchUserData, logout } from "../../redux/userSlice";
import { useConfirmation } from "../../Context/OverlayContext";
import { fetchCart, setCart } from "../../redux/cartSlice";
import { fetchWishlist, setWishlist } from "../../redux/wishlistSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const dispatch = useDispatch();
  const { showConfirmation } = useConfirmation();
  const { userData } = useSelector((s) => s.userReducer);
  const { cartProducts } = useSelector((s) => s.cartReducer);
  const { wishlistProducts } = useSelector((s) => s.wishlistReducer);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const handleLogout = useCallback(async () => {
    dispatch(logout());
    dispatch(fetchUserData());
    dispatch(setCart([]));
    dispatch(setWishlist([]));
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className={`navbar-container ${pathname === "/" && "nav-fixed"}`}>
      {/* Categories (left) */}
      <div className={`nav-categories ${menuOpen ? "active" : ""}`}>
        <Link to="/Explore?cat=all" onClick={closeMenu}>
          All
        </Link>

        {/* Men Dropdown */}
        <div
          className="nav-dropdown"
          onMouseEnter={() => setDropdownOpen("men")}
          onMouseLeave={() => setDropdownOpen(null)}
        >
          <Link to="/Explore?cat=men" onClick={closeMenu}>
            Men
          </Link>
          {dropdownOpen === "men" && (
            <div className="dropdown-menu">
              <Link to="/Explore?cat=men&sub=shirts" onClick={closeMenu}>
                Shirts
              </Link>
              <Link to="/Explore?cat=men&sub=jeans" onClick={closeMenu}>
                Jeans
              </Link>
              <Link to="/Explore?cat=men&sub=shoes" onClick={closeMenu}>
                Shoes
              </Link>
              <Link to="/Explore?cat=men&sub=accessories" onClick={closeMenu}>
                Accessories
              </Link>
            </div>
          )}
        </div>

        {/* Women Dropdown */}
        <div
          className="nav-dropdown"
          onMouseEnter={() => setDropdownOpen("women")}
          onMouseLeave={() => setDropdownOpen(null)}
        >
          <Link to="/Explore?cat=women" onClick={closeMenu}>
            Women
          </Link>
          {dropdownOpen === "women" && (
            <div className="dropdown-menu">
              <Link to="/Explore?cat=women&sub=dresses" onClick={closeMenu}>
                Dresses
              </Link>
              <Link to="/Explore?cat=women&sub=tops" onClick={closeMenu}>
                Tops
              </Link>
              <Link to="/Explore?cat=women&sub=heels" onClick={closeMenu}>
                Heels
              </Link>
              <Link to="/Explore?cat=women&sub=jewellery" onClick={closeMenu}>
                Jewellery
              </Link>
            </div>
          )}
        </div>

        {/* Kids Dropdown */}
        <div
          className="nav-dropdown"
          onMouseEnter={() => setDropdownOpen("kids")}
          onMouseLeave={() => setDropdownOpen(null)}
        >
          <Link to="/Explore?cat=kids" onClick={closeMenu}>
            Kids
          </Link>
          {dropdownOpen === "kids" && (
            <div className="dropdown-menu">
              <Link to="/Explore?cat=kids&sub=tshirts" onClick={closeMenu}>
                T-Shirts
              </Link>
              <Link to="/Explore?cat=kids&sub=shorts" onClick={closeMenu}>
                Shorts
              </Link>
              <Link to="/Explore?cat=kids&sub=shoes" onClick={closeMenu}>
                Shoes
              </Link>
              <Link to="/Explore?cat=kids&sub=toys" onClick={closeMenu}>
                Toys
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        <img
          src="/LOGO_BLACK_TRANS.png"
          alt="Wild Stitch Logo"
          className="logo-image"
        />
        <span className="logo-text">WILD STITCH</span>
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

      {/* Navigation Links (right) */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li onClick={closeMenu}>
          <Link to="/">Home</Link>
        </li>

        {/* Shop Dropdown */}
        <li
          className="nav-dropdown"
          onMouseEnter={() => setDropdownOpen("shop")}
          onMouseLeave={() => setDropdownOpen(null)}
          onClick={closeMenu}
        >
          <Link to="/Explore">Shop</Link>
          {dropdownOpen === "shop" && (
            <div className="dropdown-menu">
              <Link to="/Explore?cat=men" onClick={closeMenu}>
                Men
              </Link>
              <Link to="/Explore?cat=women" onClick={closeMenu}>
                Women
              </Link>
              <Link to="/Explore?cat=kid" onClick={closeMenu}>
                Kids
              </Link>
              <Link to="/Explore?cat=new" onClick={closeMenu}>
                New Arrivals
              </Link>
              <Link to="/Explore?cat=sale" onClick={closeMenu}>
                Sale
              </Link>
            </div>
          )}
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
            <button className="nav-btn logout-btn">Logout</button>
          </li>
        ) : (
          <li onClick={closeMenu}>
            <Link to="/Auth">
              <button className="nav-btn login-btn">Login</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
