import React, { useState } from "react";
import "./UploadProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../Utility/Loading/Loading";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const colorOptions = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Biege",
];

const UploadProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",

    price: "",
    discountPrice: "",
    sizes: {},
    color: "",

    brand: "",
    material: "",
    thumbnail: null,
    gallery: [null, null, null],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckboxChange = (e, field) => {
    const { value } = e.target;

    setProduct({ ...product, [field]: value });
  };

  const handleSizeToggle = (size) => {
    const updatedSizes = { ...product.sizes };
    if (size in updatedSizes) {
      delete updatedSizes[size];
    } else {
      updatedSizes[size] = 0;
    }
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleSizeStockChange = (size, value) => {
    const updatedSizes = { ...product.sizes, [size]: value };
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleThumbnailChange = (e) => {
    setProduct({ ...product, thumbnail: e.target.files[0] });
  };

  const handleGalleryChange = (index, file) => {
    const updatedGallery = [...product.gallery];
    updatedGallery[index] = file;
    setProduct({ ...product, gallery: updatedGallery });
  };

  const getImagePreview = (file) => (file ? URL.createObjectURL(file) : null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !product.title.trim() ||
        !product.description.trim() ||
        !product.category.trim() ||
        !product.subCategory.trim() ||
        !product.price ||
        !product.discountPrice ||
        !product.color.trim() || // ✅ check colors
        !product.brand.trim() ||
        !product.material.trim() ||
        !product.thumbnail
      ) {
        return toast.warning("All fileds are required*");
      }
      if (Object.keys(product.sizes).length === 0) {
        return toast.warning("Select at least one size");
      }
      if (product.gallery.length !== 3) {
        return toast.warning("All three images of gallery are required");
      }

      if (Number(product.discountPrice) > Number(product.price)) {
        console.log(product.discountPrice, " ", product.price);
        return toast.warn("Discount price always be lesser than actual price");
      }

      const productData = new FormData();
      productData.append("title", product.title);
      productData.append("description", product.description);
      productData.append("category", product.category);

      productData.append("price", product.price);
      productData.append("discountPrice", product.discountPrice);

      productData.append("brand", product.brand);
      productData.append("material", product.material);

      // Sizes (object → JSON string)
      productData.append("sizes", JSON.stringify(product.sizes));
      productData.append("subCategory", product.subCategory);

      // Colors (array → JSON string)
      productData.append("color", product.color);
      productData.append("thumbnail", product.thumbnail);
      // productData.append("gallery", product.gallery);
      product.gallery.forEach((img) => {
        productData.append("gallery", img);
      });

      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/addProduct`,
        productData,
        {
          headers: {
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_LOCALSTORAGE_KEY
            )}`,
          },
        }
      );

      toast.success("Product uploaded successfully");
      // setting product again to the empty
      setProduct({
        title: "",
        description: "",
        category: "",
        subCategory: "",
        price: "",
        discountPrice: "",
        sizes: {},
        colors: "",

        brand: "",
        material: "",
        thumbnail: null,
        gallery: [null, null, null],
      });
    } catch (error) {
      toast.error(error.response?.data || "Network Error");
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      
       
      
        <form onSubmit={handleSubmit} className="upload-form">
          <h2>Upload Clothing Product</h2>

          <div className="form-row">
            <div className="input-group-uploadProduct" key="tile">
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                required
                placeholder=""
                minLength="3"
                disabled={loading}
              />
              <label className="filled">Title</label>
            </div>

            <div className="input-group-uploadProduct full">
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
                placeholder=""
                disabled={loading}
              />
              <label className={product.description && "filled"}>
                Description
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group-uploadProduct">
              <select
                className="uploadProduct-select"
                name="category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                required
                disabled={loading}
              >
                <option value=""></option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
              </select>
              <label htmlFor="category">Category</label>
            </div>

            <div className="input-group-uploadProduct">
              <select
                className="uploadProduct-select"
                name="category"
                value={product.subCategory}
                onChange={(e) =>
                  setProduct({ ...product, subCategory: e.target.value })
                }
                required
                disabled={loading}
              >
                <option value=""></option>
                <option value="shirt">shirt</option>
                <option value="top">top</option>
                <option value="pant">pant</option>
                <option value="t-shirt">t-shirt</option>
                <option value="jeans">jeans</option>
                <option value="bottom">bottom</option>
                <option value="full">full</option>
              </select>
              <label htmlFor="category">Sub-category</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group-uploadProduct">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
                placeholder=""
                disabled={loading}
              />
              <label className={product.price && "filled"}>Price</label>
            </div>
            <div className="input-group-uploadProduct">
              <input
                type="number"
                name="discountPrice"
                value={product.discountPrice}
                onChange={handleInputChange}
                placeholder=""
                disabled={loading}
              />
              <label className={product.discountPrice && "filled"}>
                Discount Price
              </label>
              <span>* If no discount enter 0</span>
            </div>
          </div>

          <div className="form-row">
            {["brand", "material"].map((field) => (
              <div className="input-group-uploadProduct" key={field}>
                <input
                  type="text"
                  name={field}
                  value={product[field]}
                  onChange={handleInputChange}
                  placeholder=""
                  required
                  disabled={loading}
                />
                <label className={product[field] && "filled"}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
          </div>

          {/* Size with stock */}
          <div className="form-row">
            <div className="size-stock-group">
              <label>Sizes with Stock:</label>
              <div className="size-stock-list">
                {sizeOptions.map((size) => (
                  <div key={size} className="size-stock-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={size in product.sizes}
                        onChange={() => handleSizeToggle(size)}
                        disabled={loading}
                      />
                      {size}
                    </label>
                    {size in product.sizes && (
                      <input
                        type="number"
                        placeholder="Qty"
                        value={product.sizes[size]}
                        onChange={(e) =>
                          handleSizeStockChange(size, e.target.value)
                        }
                        className="stock-input"
                        disabled={loading}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="form-row">
            <div className="checkbox-group">
              <label>Colors Available:</label>
              {colorOptions.map((color) => (
                <label key={color} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={color}
                    checked={product.color === color}
                    onChange={(e) => handleCheckboxChange(e, "color")}
                    disabled={loading}
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="form-row">
            <div className="image-section">
              <label className="image-label">Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                disabled={loading}
              />
              {product.thumbnail && (
                <img
                  src={getImagePreview(product.thumbnail)}
                  alt="Thumbnail"
                  className="image-preview"
                  
                />
              )}
            </div>
            <div className="image-section">
              <label className="image-label">Gallery Images</label>
              {product.gallery.map((img, index) => (
                <div key={index} className="gallery-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleGalleryChange(index, e.target.files[0])
                      
                    }
                    disabled={loading}
                  />
                  {img && (
                    <img
                      src={getImagePreview(img)}
                      alt={`Gallery ${index + 1}`}
                      className="image-preview"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading?"Loading...":"Upload Product"}
          </button>
        </form>
      
    </div>
  );
};

export default UploadProduct;
