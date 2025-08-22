import "./ItemCard.css";

import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, onAddToWishlist, alreadyInWishlist, handleRemoveFromWishlist}) => {
  const navigate = useNavigate();
  
  return (
    <div className="itemCard-container">
      <div className="itemCard-container-img" onClick={() => navigate(`/explore/${item._id}`)}>
        <img src={item.thumbnail.secure_url} alt={item.title} width="100%" height="100%" loading="lazy"/>
      </div>
      <div className="itemCard-container-content">
        <h5 className="capitalized">{item.brand}</h5>
        <h4 className="capitalized">{item.title}</h4>
        <p>Rs. {item.discountPrice ? (
                 <>
              
                  <del>{item.price}</del> &nbsp;{item.discountPrice}
                </>
              ) : (
                
                item.price
              )} </p>
        {(onAddToWishlist || handleRemoveFromWishlist) &&
       <> {!alreadyInWishlist ? (
          <span onClick={() => onAddToWishlist(item._id)}>
            <i className="bi bi-heart" title="Add to wishlist"></i>
          </span>
        ) : (
          <span onClick={() => handleRemoveFromWishlist(item._id)} >
            <i className="bi bi-heart-fill itemInCart" title="ALready in wishlist"></i>
          </span>
        )}
       </>}
        {/* <button >Add to cart</button> */}
      </div>
    </div>
  );
};

export default ItemCard;
