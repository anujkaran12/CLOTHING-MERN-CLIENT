import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { Suspense, lazy } from "react";
import Loading from "./Components/Utility/Loading/Loading";


// Lazy imports
const Home = lazy(() => import("./Pages/Home/Home"));
const Explore = lazy(() => import("./Pages/Explore/Explore"));
const SingleProduct = lazy(() => import("./Pages/SingleProduct/SingleProduct"));
const Auth = lazy(() => import("./Pages/Auth/Auth"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const SellerDashboard = lazy(() => import("./Pages/SellerDashboard/SellerDashboard"));
const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
const Cancel = lazy(() => import("./Pages/PaymentStatus/Cancel"));
const Success = lazy(() => import("./Pages/PaymentStatus/Success"));
const Orders = lazy(() => import("./Pages/Orders/Orders"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));
const PageNotFound = lazy(() => import("./Components/Utility/ErrorStates/PageNotFound"));
const PrivacyPolicy = lazy(()=>import("./Pages/PrivacyPolicy/PrivacyPolicy"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        {/* Suspense wraps lazy-loaded components */}
        <Suspense fallback={<div style={{minHeight:'100vh'}}><Loading/></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Explore/:productId" element={<SingleProduct />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Seller" element={<SellerDashboard />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Cancel" element={<Cancel />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          </Routes>
        </Suspense>

        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
