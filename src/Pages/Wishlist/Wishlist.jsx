import { useCallback } from "react";
import "./Wishlist.css";
import ItemCard from "../../Components/ItemCard/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import {removeFromWishlist } from "../../redux/wishlistSlice";
import Loading from "../../Components/Utility/Loading/Loading";
import CommonError from "../../Components/Utility/ErrorStates/CommonError";

import EmptyState from "../../Components/Utility/ErrorStates/EmptyState";

import NotLoggedIn from "../../Components/Utility/ErrorStates/NotLoggedIn";
import UserSpecificPageError from "../../Components/Utility/ErrorStates/UserSpecificPageError";

const Wishlist = () => {
  
  const dispatch = useDispatch();
  const handleRemoveFromWishlist = useCallback(
    (id) => dispatch(removeFromWishlist(id)),
    [dispatch]
  );

  const { wishlistProducts, loading, error } = useSelector(
    (state) => state.wishlistReducer
  );
  const {
    userData,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userReducer);

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-head">My Wishlist</h2>
      {userLoading ? (
        <Loading />
      ) : userError ? (
        <NotLoggedIn />
      ) : !userData ? (
        <NotLoggedIn />
      ) : userData.role==='seller'?<UserSpecificPageError user="buyer"/>: (
        <div className="wishlist-grid">
          {loading ? (
            <Loading />
          ) : error ? (
            <CommonError message={error} />
          ) : wishlistProducts.length === 0 ? (
            <EmptyState
              headMsg={"Your wishlist is empty"}
              message={"Looks like you haven’t added any items yet."}
            />
          ) : (
            wishlistProducts.map((item, index) => {
              const isInWishlist = wishlistProducts.some(
                (c) => c._id === item._id
              );
              console.log(isInWishlist);
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  alreadyInWishlist={isInWishlist}
                  handleRemoveFromWishlist={handleRemoveFromWishlist}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
