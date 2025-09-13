import React, { useEffect } from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'})
  },[])
  return (
    <div className="PP-page-container">
      <h1 className="PP-title">Privacy Policy</h1>
      <p className="PP-date">Last updated: September 13, 2025</p>

      <p className="PP-text">
        This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
      </p>
     

      <h2 className="PP-subtitle">Interpretation and Definitions</h2>
      <h3 className="PP-subsub">Interpretation</h3>
      <p className="PP-text">
        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
      </p>

      <h3 className="PP-subsub">Definitions</h3>
      <p className="PP-text">For the purposes of this Privacy Policy:</p>
      <ul className="PP-list">
        <li><strong>Account</strong>: A unique account created for You to access our Service or parts of our Service.</li>
        <li><strong>Affiliate</strong>: An entity under common control with the Company.</li>
        <li><strong>Application</strong>: Refers to WILD STITCH.</li>
        <li><strong>Company</strong>: Refers to WILD STITCH.</li>
        <li><strong>Cookies</strong>: Small files placed on Your computer by a website.</li>
        <li><strong>Country</strong>: Madhya Pradesh, India.</li>
        <li><strong>Device</strong>: Any device accessing the Service.</li>
        <li><strong>Personal Data</strong>: Information relating to an identifiable individual.</li>
        <li><strong>Service</strong>: Application or Website or both.</li>
        <li><strong>Service Provider</strong>: Processes data on behalf of the Company.</li>
        <li><strong>Usage Data</strong>: Data collected automatically from the Service.</li>
        <li><strong>Website</strong>: WILD STITCH at <a href="https://clothing-mern-client.vercel.app/" target="_blank" rel="noopener noreferrer">https://clothing-mern-client.vercel.app/</a></li>
        <li><strong>You</strong>: The individual using the Service or the company they represent.</li>
      </ul>

      <h2 className="PP-subtitle">Collecting and Using Your Personal Data</h2>
      <h3 className="PP-subsub">Types of Data Collected</h3>
      <h4 className="PP-smallsub">Personal Data</h4>
      <p className="PP-text">
        We may ask You for personally identifiable information, such as:
      </p>
      <ul className="PP-list">
        <li>Email address</li>
        <li>First name and last name</li>
        <li>Phone number</li>
        <li>Address, State, City, ZIP/Postal code</li>
        <li>Usage Data</li>
      </ul>

      <h4 className="PP-smallsub">Usage Data</h4>
      <p className="PP-text">
        Data collected automatically: IP address, browser type, visited pages, timestamps, unique device identifiers.
      </p>

      <h2 className="PP-subtitle">Use of Your Personal Data</h2>
      <ul className="PP-list">
        <li>Provide and maintain the Service</li>
        <li>Manage Your Account</li>
        <li>Performance of a contract</li>
        <li>Contact You by email, SMS, push notifications</li>
        <li>Provide news, special offers, and general info</li>
        <li>Manage Your requests</li>
        <li>Business transfers</li>
        <li>Other purposes (analytics, promotional campaigns, etc.)</li>
      </ul>

      <h2 className="PP-subtitle">Contact Us</h2>
      <p className="PP-text">
        For any questions about this Privacy Policy, You can contact us at:
      </p>
      <ul className="PP-list">
        <li>Email: anujkaran420@gmail.com</li>
      </ul>
    </div>
  );
}

export default PrivacyPolicy;
