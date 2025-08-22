import { useCallback, useState } from "react";
import UploadProduct from "../../Components/Seller/UploadProduct/UploadProduct";
import PreviousProducts from "../../Components/Seller/PreviousProducts/PreviousProducts";
import OrderHistory from "../../Components/Seller/OrderHistory/OrderHistory";

import "./SellerDashboard.css";
import { useSelector } from "react-redux";
import Loading from "../../Components/Utility/Loading/Loading";
import NotLoggedIn from "../../Components/Utility/ErrorStates/NotLoggedIn";
import UserSpecificPageError from "../../Components/Utility/ErrorStates/UserSpecificPageError";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const { userData, loading, error } = useSelector(
    (state) => state.userReducer
  );
  const renderComponent = useCallback(() => {
    if (activeTab === "upload") {
      return <UploadProduct />;
    } else if (activeTab === "previous") {
      return <PreviousProducts />;
    } else {
      return <OrderHistory />;
    }
  }, [activeTab]);

  return (
    <>
      <div className="seller-dashboard">
        {loading ? (
          <Loading />
        ) : error ? (
          <NotLoggedIn />
        ) : !userData ? (
          <NotLoggedIn />
        ) : userData.role==='buyer'?<UserSpecificPageError user='seller'/>: (
          <>
            <div className="toggle-buttons">
              <button
                className={activeTab === "upload" ? "active" : ""}
                onClick={() => setActiveTab("upload")}
              >
                Upload Product
              </button>
              <button
                className={activeTab === "previous" ? "active" : ""}
                onClick={() => setActiveTab("previous")}
              >
                Previous Products
              </button>
              <button
                className={activeTab === "order" ? "active" : ""}
                onClick={() => setActiveTab("order")}
              >
                Order History
              </button>
            </div>

            {renderComponent()}
          </>
        )}
      </div>
    </>
  );
};

export default SellerDashboard;
