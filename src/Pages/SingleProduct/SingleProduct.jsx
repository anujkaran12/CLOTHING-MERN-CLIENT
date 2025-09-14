import { useCallback, useEffect, useMemo, useState } from "react";
import "./SingleProduct.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Utility/Loading/Loading";
import CommonError from "../../Components/Utility/ErrorStates/CommonError";
import NoProductFound from "../../Components/Utility/ErrorStates/NoProductFound";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { fetchAllProducts } from "../../redux/productsSlice";
import ItemCard from "../../Components/ItemCard/ItemCard";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  const fetchProductDetails = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/explore/${params.productId}`
      );
      setProduct(res.data);
      setSelectedImage(res.data?.thumbnail.secure_url);
    } catch (error) {
      setError(error.response?.data || "Network error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
    dispatch(fetchAllProducts());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.productId]);

  const { userData } = useSelector((state) => state.userReducer);
  const { productsData, loading: productsDataLoading } = useSelector(
    (state) => state.productsReducer
  );
  const { wishlistProducts, loading: wishlistLoading } = useSelector(
    (state) => state.wishlistReducer
  );
  const [isAdding, setIsAdding] = useState(false);

  const handlerAddToCart = useCallback(async () => {
    if (!userData) return toast.error("Login for add to cart");
    if (!selectedSize) return toast.warn("Size must be selected");
    if (quantity === 0) return toast.warn("Enter quantity");

    setIsAdding(true);
    await dispatch(
      addToCart({
        productId: params.productId,
        size: selectedSize,
        quantity: quantity,
      })
    );
    setIsAdding(false);
  }, [userData, selectedSize, quantity, dispatch, params.productId]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    if (!selectedSize) return;
    const max = product.sizes[selectedSize];
    const raw = e.target.value;
    if (raw === "") {
      setQuantity("");
      return;
    }
    const num = Number(raw);
    if (Number.isNaN(num)) return;
    const clamped = Math.min(Math.max(1, Math.floor(num)), max);
    setQuantity(clamped);
  };

  const productIsInWishlist = useMemo(() => {
    const res = wishlistProducts?.filter((item) => item._id === product?._id);
    return res.length !== 0 ? true : false;
  }, [wishlistProducts, product]);

  const onWishlistHandler = () => {
    if (!userData) {
      return toast.error("Login for add in wishlist");
    }
    if (productIsInWishlist) {
      return dispatch(removeFromWishlist(product._id));
    } else {
      return dispatch(addToWishlist(product._id));
    }
  };
  const calculateDiscount = useMemo(() => {
    return Math.round(
      ((product?.price - product?.discountPrice) / product?.price) * 100
    );
  }, [product]);
  return (
    <div className="single-product-page">
      {loading ? (
        <Loading />
      ) : error ? (
        <CommonError message={error} />
      ) : !product ? (
        <NoProductFound />
      ) : (
        <>
          {/* Product Details Section */}
          <div className="single-product-container">
            {/* Left: Images */}
            <div className="single-product-images">
              {/* <img
                src={selectedImage}
                alt={product.title}
                className="single-product-main-img"
                loading="lazy"
              /> */}
              <div className="single-product-gallery">
                {[product.thumbnail, ...product.galleryImages].map(
                  (img, idx) => (
                    <img
                      key={idx}
                      src={img.secure_url}
                      alt={`Gallery ${idx}`}
                      className={`single-product-gallery-img ${
                        selectedImage === img.secure_url ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(img.secure_url)}
                      loading="lazy"
                    />
                  )
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div className="single-product-details">
              <h1 className="single-product-title">{product.title}</h1>

              <p className="single-product-price">
                {product.discountPrice ? (
                  <>
                    Rs.
                    {product.discountPrice} &nbsp; <del>Rs.{product.price}</del>{" "}
                    &nbsp; <div>({calculateDiscount}% OFF)</div>
                  </>
                ) : (
                  <>Rs.{product.price}</>
                )}
                <span>inclusive of all taxes</span>
              </p>
              <p className="single-product-brand">
                BRAND: <span>{product.brand.toUpperCase()}</span>
              </p>
              <p className="single-product-material">
                MATERIAL: <span>{product.material.toUpperCase()}</span>
              </p>

              {/* Sizes */}
              <div className="single-product-sizes">
                <p className="single-product-section-title">Select Size:</p>
                <div className="single-product-size-options">
                  {Object.keys(product.sizes).map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`single-product-size ${
                        selectedSize === size ? "selected" : ""
                      } ${!product.sizes[size] && "disable"}`}
                      onClick={() => handleSizeSelect(size)}
                      disabled={!product.sizes[size]}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="single-product-size-qty">
                    Available Quantity: {product.sizes[selectedSize]}
                  </p>
                )}

                {/* Quantity Selector */}
                {selectedSize && (
                  <div className="single-product-quantity">
                    <label htmlFor="single-product-qty">Quantity:</label>
                    <input
                      id="single-product-qty"
                      type="number"
                      min="1"
                      max={product.sizes[selectedSize]}
                      value={quantity}
                      onChange={handleQuantityChange}
                      aria-label="Select quantity"
                    />
                    <span className="single-product-max-info">
                      (Max {product.sizes[selectedSize]} for{" "}
                      {selectedSize.toUpperCase()})
                    </span>
                  </div>
                )}
              </div>

              <div className="single-product-actions">
                <button
                  className="single-product-add-btn wishlist-btn"
                  disabled={isAdding}
                  onClick={onWishlistHandler}
                >
                  {wishlistLoading ? (
                    <p>LOADING...</p>
                  ) : productIsInWishlist ? (
                    <>
                      <p>REMOVE FROM WISHLIST</p>
                      <i className="bi bi-heart-fill"></i>
                    </>
                  ) : (
                    <>
                      <p>ADD IN WISHLIST</p>
                      <i className="bi bi-heart"></i>
                    </>
                  )}
                </button>

                <button
                  className="single-product-add-btn cart-btn"
                  onClick={handlerAddToCart}
                  disabled={!selectedSize || quantity < 1 || isAdding}
                >
                  {isAdding ? (
                    "Adding..."
                  ) : (
                    <>
                      <p>ADD TO CART</p>
                      <i className="bi bi-cart4"></i>
                    </>
                  )}
                </button>
              </div>
              <p className="single-product-description">
                {product.description}
              </p>
              
          
            </div>
          </div>

          {/* You May Also Like Section */}
          {productsDataLoading ? (
            <Loading />
          ) : productsData ? (
            <div className="related-products-section">
              <h2 className="related-products-title">You May Also Like</h2>
              <p className="related-products-subtitle">
                Discover similar products you might like
              </p>
              <div className="related-products-grid">
                {productsData.slice(0, 4).map((item, index) => (
                  <ItemCard key={index} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default SingleProduct;
