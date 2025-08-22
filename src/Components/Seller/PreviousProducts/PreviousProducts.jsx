import React, { useState, useEffect, useMemo } from "react";
import "./PreviousProducts.css";
import axios from "axios";
import Loading from "../../Utility/Loading/Loading";
import CommonError from "../../Utility/ErrorStates/CommonError";
import { toast } from "react-toastify";
import NoProductFound from "../../../Components/Utility/ErrorStates/NoProductFound";
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const PreviousProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPrice: "",

    sizes: {},
  });

  const getAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/seller/getAllProducts`,
        {
          headers: {
            Authorization: localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            ),
          },
        }
      );
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  // Open update modal with product data
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);

    setFormData({
      price: product.price,
      discountPrice: product.discountPrice,

      sizes: {}, // 🔑 fill sizes
    });
    setShowUpdateModal(true);
  };
  const handleSizeToggle = (size) => {
    const updatedSizes = { ...formData.sizes };
    if (size in updatedSizes) {
      delete updatedSizes[size];
    } else {
      updatedSizes[size] = 0;
    }
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSizeStockChange = (size, value) => {
    const updatedSizes = { ...formData.sizes, [size]: value };
    setFormData({ ...formData, sizes: updatedSizes });
  };
  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update request
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (formData.price <= formData.discountPrice) {
      return toast.warn("Discount price always be lesser than actual price");
    }
    try {
      // find only changed fields
      const updatedFields = {};

      Object.keys(formData).forEach((key) => {
        if (key !== "sizes") {
          if (Number(formData[key]) !== Number(selectedProduct[key])) {
            updatedFields[key] = formData[key];
          }
        }
      });

      if (Object.keys(formData.sizes).length !== 0) {
        updatedFields["sizes"] = formData.sizes;
      }

      if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes made.");
        return;
      }
      setLoading(true)

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/updateProduct/${selectedProduct._id}`,
        updatedFields,
        {
          headers: {
            Authorization: localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            ),
          },
        }
      );

      toast.success("Product updated successfully!");

      setShowUpdateModal(false);
      getAllProducts();
    } catch (err) {
      
      toast.error("Failed to update product!");
    }
    setLoading(false)
  };

  return (
    <div className="previous-products-container">
      <h2>Uploaded Products</h2>

      <input
        type="text"
        placeholder="Search products by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="products-grid">
        {loading ? (
          <Loading />
        ) : error ? (
          <CommonError message={error} />
        ) : filteredProducts.length === 0 ? (
          <NoProductFound />
        ) : (
          filteredProducts?.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.thumbnail.secure_url} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.brand}</p>
                <p>price ₹{product.price}</p>
                <p>discount price ₹{product.discountPrice}</p>
                <p>Category: {product.category}</p>
                <p>
                  Sizes:{" "}
                  {Object.entries(product.sizes || {})
                    .map(([size, qty]) => `${size}: ${qty}`)
                    .join(", ")}
                </p>
              </div>
              <button
                className="update-btn"
                onClick={() => handleUpdateClick(product)}
              >
                Update
              </button>
            </div>
          ))
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
          {loading ? (
            <Loading messge={"updating product..."} />
          ) : (
            <>
                <h2>Update Product</h2>
                <form onSubmit={handleUpdateSubmit}>
                  <label htmlFor="title">Product Title</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue={selectedProduct.title}
                    disabled={true}
                    style={{ cursor: "not-allowed" }}
                  />

                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />

                  <label htmlFor="discountPrice">Discount Price</label>
                  <input
                    id="discountPrice"
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                  />

                  <div className="form-row">
                    <div className="size-stock-group">
                      <label>
                        Sizes with Stock:(*if you don't want to update and add
                        new sizes leave all blanks )
                      </label>
                      <div className="size-stock-list">
                        {sizeOptions.map((size) => (
                          <div key={size} className="size-stock-item">
                            <label>
                              <input
                                type="checkbox"
                                checked={size in formData.sizes}
                                onChange={() => handleSizeToggle(size)}
                              />
                              {size}
                            </label>
                            {size in formData.sizes && (
                              <input
                                type="number"
                                placeholder="Qty"
                                value={formData.sizes[size]}
                                onChange={(e) =>
                                  handleSizeStockChange(size, e.target.value)
                                }
                                className="stock-input"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="confirm-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
            </>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousProducts;
