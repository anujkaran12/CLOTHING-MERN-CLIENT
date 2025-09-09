import "./ItemCard.css";

import { useNavigate } from "react-router-dom";

const ItemCard = ({
  item,
  onAddToWishlist,
  alreadyInWishlist,
  handleRemoveFromWishlist,
  wishlistLoading,
}) => {
  const navigate = useNavigate();

  return (
    <div className="itemCard-container">
      <div className="itemCard-container-img">
        <img
          src={item.thumbnail.secure_url}
          alt={item.title}
          width="100%"
          height="100%"
          loading="lazy"
          onClick={() => navigate(`/explore/${item._id}`)}
        />
        <button
          className="hover-button"
          disabled={wishlistLoading}
          onClick={() => {
            alreadyInWishlist
              ? handleRemoveFromWishlist(item._id)
              : onAddToWishlist(item._id);
          }}
        >
          {wishlistLoading
            ? "LOADING..."
            : alreadyInWishlist
            ? "REMOVE FROM WISHLIST"
            : "ADD TO WISHLIST"}
        </button>
      </div>
      <div className="itemCard-container-content">
        <h5 className="capitalized">{item.brand}</h5>
        <h4 className="capitalized">{item.title}</h4>
        <p>
          {item.discountPrice ? (
            <>
              <del>Rs.{item.price}</del> &nbsp;Rs.{item.discountPrice}
            </>
          ) : (
            <>Rs.{item.price}</>
          )}{" "}
        </p>

        {(onAddToWishlist || handleRemoveFromWishlist) && (
          <>
            {" "}
            {!alreadyInWishlist ? (
              <span onClick={() => onAddToWishlist(item._id)}>
                <i className="bi bi-heart" title="Add to wishlist"></i>
              </span>
            ) : (
              <span onClick={() => handleRemoveFromWishlist(item._id)}>
                <i
                  className="bi bi-heart-fill itemInCart"
                  title="ALready in wishlist"
                ></i>
              </span>
            )}
          </>
        )}
        {/* <button >Add to cart</button> */}
      </div>
    </div>
  );
};

export default ItemCard;
