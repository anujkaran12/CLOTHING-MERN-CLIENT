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
import { fetchAllProducts } from "../../redux/productsSlice";
import ItemCard from "../../Components/ItemCard/ItemCard";
const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
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
  const [isAdding, setIsAdding] = useState(false);

  const handlerAddToCart = useCallback(async () => {
    if (!userData) return toast.error("Login to add to cart");
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
              <img
                src={selectedImage}
                alt={product.title}
                className="single-product-main-img"
                loading="lazy"
              />
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
              <p className="single-product-description">
                {product.description}
              </p>
              <p className="single-product-price">
                
                {product.discountPrice ? (
                  <>
                    <del>Rs.{product.price}</del> &nbsp; Rs.{product.discountPrice}
                  </>
                ) : (
                  <>Rs.{product.price}</>
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
                <p>
                  <strong>Email:</strong> {product.seller.email}
                </p>
              </div>
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
                {productsData.slice(0, 4).map((item) => (
                  <ItemCard item={item} />
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
