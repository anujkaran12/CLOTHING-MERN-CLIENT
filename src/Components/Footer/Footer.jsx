import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo & Description */}
        <div className="footer-section footer-logo-section">
          <img src="/LOGO_WHITE_TRANS.png" alt="Wild Stitch Logo" />
          <p>Wild Stitch is your go-to fashion destination for trendy and premium clothing. Explore our collections today!</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h3>Explore</h3>
          <Link to="/explore">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-section newsletter">
          <h3>Join Our Newsletter</h3>
          <p>Get updates on latest trends, offers, and exclusive deals.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      {/* Social & Bottom */}
      <div className="footer-bottom">
        <div className="social-icons">
          <Link aria-label="Facebook"><i className="bi bi-facebook"></i></Link>
          <Link aria-label="Twitter"><i className="bi bi-twitter"></i></Link>
          <Link aria-label="Instagram"><i className="bi bi-instagram"></i></Link>
        </div>
        <p>© {new Date().getFullYear()} Wild Stitch — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
