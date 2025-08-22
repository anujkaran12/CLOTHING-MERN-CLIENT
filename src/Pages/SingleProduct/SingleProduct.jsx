import { useCallback, useEffect, useState } from "react";
import "./SingleProduct.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Utility/Loading/Loading";
import CommonError from "../../Components/Utility/ErrorStates/CommonError";
import NoProductFound from "../../Components/Utility/ErrorStates/NoProductFound";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const SingleProduct = () => {
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

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
  // on component mount
  useEffect(() => {
    fetchProductDetails();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  const [isAdding, setIsAdding] = useState(false);

  const handlerAddToCart = useCallback(async () => {
    if (!userData) {
      return toast.error("Login to add to cart");
    }
    if (!selectedSize) {
      return toast.warn("Size must be selected");
    }
    if (quantity === 0) {
      return toast.warn("Enter quantity");
    }

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
    setQuantity(1); // reset to 1 for the newly selected size
  };

  const handleQuantityChange = (e) => {
    // If no size selected, ignore
    if (!selectedSize) return;

    const max = product.sizes[selectedSize];
    const raw = e.target.value;

    // allow empty (so user can type), otherwise clamp
    if (raw === "") {
      setQuantity("");
      return;
    }

    const num = Number(raw);
    if (Number.isNaN(num)) return;

    const clamped = Math.min(Math.max(1, Math.floor(num)), max);
    setQuantity(clamped);
  };

  return (
    <div className="single-product-container">
      {loading ? (
        <Loading />
      ) : error ? (
        <CommonError message={error} />
      ) : !product ? (
        <NoProductFound />
      ) : (
        <>
          {/* Left: Images */}
          <div className="single-product-images">
            <img
              src={selectedImage}
              alt={product.title}
              className="single-product-main-img"
              loading="lazy"
            />
            <div className="single-product-gallery">
              {[product.thumbnail, ...product.galleryImages].map((img, idx) => (
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
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="single-product-details">
            <h1 className="single-product-title">{product.title}</h1>
            <p className="single-product-description">{product.description}</p>

            <p className="single-product-price">
              ₹
              {product.discountPrice ? (
                <>
                  <del>{product.price}</del> &nbsp;{product.discountPrice}
                </>
              ) : (
                product.price
              )}
            </p>
            <p className="single-product-brand">Brand: {product.brand}</p>
            <p className="single-product-material">
              Material: {product.material}
            </p>

            {/* Sizes */}
            <div className="single-product-sizes">
              <p className="single-product-section-title">Available Sizes:</p>
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
            </div>

            {/* Quantity Selector (max depends on selectedSize) */}
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

            <button
              className="single-product-add-btn"
              onClick={handlerAddToCart}
              disabled={!selectedSize || quantity < 1 || isAdding}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>
            {/* Seller Info */}
            <div className="single-product-seller">
              <p className="single-product-section-title">
                Seller Information:
              </p>
              <p>
                <strong>Name:</strong> {product.seller.fullName}
              </p>
              <p></p>
              <p>
                <strong>Email:</strong> {product.seller.email}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
