import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        
        {/* Logo */}
        <div className="footer-logo">WEARLOOM</div>

        {/* Navigation */}
        <nav className="footer-nav">
          <Link to="/explore">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          
        </nav>

        {/* Social */}
        <div className="footer-social">
          <Link  aria-label="Facebook">
            <i className="bi bi-facebook"></i>
          </Link>
          <Link  aria-label="Twitter">
            <i className="bi bi-twitter"></i>
          </Link>
          <Link aria-label="Instagram">
            <i className="bi bi-instagram"></i>
          </Link>
        </div>

      </div>

      {/* Bottom text */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopSmart — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
