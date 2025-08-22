import "./Explore.css";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import ItemCard from "../../Components/ItemCard/ItemCard";
import Loading from "../../Components/Utility/Loading/Loading";
import NoProductsFound from "../../Components/Utility/ErrorStates/NoProductFound";
import CommonError from "../../Components/Utility/ErrorStates/CommonError";

import { fetchAllProducts } from "../../redux/productsSlice";
import {
  addToWishlist,
  
  removeFromWishlist,
} from "../../redux/wishlistSlice";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Explore = () => {
  const dispatch = useDispatch();

  const [params] = useSearchParams()
  console.log(params.get("cat"))


  const [filters, setFilters] = useState({
    category: params.get("cat") || 'all',
    subcategory: "all",
    sort: "default",
  });


  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { wishlistProducts } = useSelector((state) => state.wishlistReducer);
  const { productsData, error, loading } = useSelector(
    (state) => state.productsReducer
  );
  const {userData} = useSelector((state)=>state.userReducer)

  const onAddToWishlist = useCallback(
    (id) => {
      if(!userData){
        return toast.error("Please login for add in wishlist")
      }
      dispatch(addToWishlist(id))},
    [dispatch]
  );
  const handleRemoveFromWishlist = useCallback(
    (id) => dispatch(removeFromWishlist(id)),
    [dispatch]
  );

  useEffect(() => {
    if (!productsData.length) dispatch(fetchAllProducts());
    
  }, []);
  

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData]
    if (filters.category !== "all")
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      );
    if (filters.subcategory !== "all")
      filtered = filtered.filter(
        (p) =>
          p.subCategory?.toLowerCase() === filters.subcategory.toLowerCase()
      );
    if (searchQuery.trim() !== "")
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (filters.sort === "lowToHigh")
      filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === "highToLow")
      filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [productsData, filters, searchQuery]);

  const handleFilterChange = useCallback(
    (key, value) => setFilters((prev) => ({ ...prev, [key]: value })),
    []
  );
  const resetFilters = () =>
    setFilters({ category: "all", subcategory: "all", sort: "default" });

  const categories = ["all", "men", "women", "kid"];
  const subCategories = ["all", "shirt", "t-shirt", "top", "bottom", "pant","full"];
 
  return (
    <div className="explore-container">
      {/* Search */}
      <div className="explore-header">
        <input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="explore-search-bar"
        />
      </div>

      {/* Desktop filters */}
      <div className="explore-filters-desktop">
          <h1>CATEGORY</h1>
        <div className="explore-categories">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`explore-category-pill ${
                filters.category === cat.toLowerCase() ? "active" : ""
              }`}
              onClick={() => handleFilterChange("category", cat.toLowerCase())}
            >
              {cat.toUpperCase()}
            </span>
          ))}
        </div>
          <h1>SUB CATEGORY</h1>
        <div className="explore-subcategories">
          {subCategories.map((sub) => (
            <span
              key={sub}
              className={`explore-subcategory-pill ${
                filters.subcategory === sub.toLowerCase() ? "active" : ""
              }`}
              onClick={() =>
                handleFilterChange("subcategory", sub.toLowerCase())
              }
            >
              {sub.toUpperCase()}
            </span>
          ))}
        </div>
        <div className="explore-sort">
          <label>Sort by:</label>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="explore-select"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          <button className="explore-reset-button" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>
      {/* Mobile filter */}
      <div className="explore-filters-mobile">
        <button
          className="explore-mobile-toggle"
          onClick={() => setShowMobileFilters(true)}
        >
          Filters <i className="bi bi-sliders"></i>
        </button>

        {/* Right panel */}
        <div
          className={`explore-mobile-panel ${showMobileFilters ? "open" : ""}`}
        >
          <button
            className="explore-mobile-close"
            onClick={() => setShowMobileFilters(false)}
          >
            ✕
          </button>

          <div className="explore-categories">
          <h3>CATEGORY</h3>
            {categories.map((cat) => (
              <span
                key={cat}
                className={`explore-category-pill ${
                  filters.category === cat.toLowerCase() ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("category", cat.toLowerCase())
                }
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="explore-subcategories">
          <h3>SUBCATEGORY</h3>
            {subCategories.map((sub) => (
              <span
                key={sub}
                className={`explore-subcategory-pill ${
                  filters.subcategory === sub.toLowerCase() ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("subcategory", sub.toLowerCase())
                }
              >
                {sub}
              </span>
            ))}
          </div>

          <h3>Sort</h3>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="explore-select"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          <button className="explore-reset-button" onClick={resetFilters}>
            Reset
          </button>
        </div>

        {/* Overlay */}
        {showMobileFilters && (
          <div
            className="explore-overlay"
            onClick={() => setShowMobileFilters(false)}
          ></div>
        )}
      </div>

      {/* Result Count */}
      <div className="explore-count">
        Showing {filteredProducts.length} result
        {filteredProducts.length !== 1 && "s"}
      </div>

      {/* Products Grid */}
      {loading ? (
        <Loading />
      ) : error ? (
        <CommonError message={error} />
      ) : filteredProducts.length === 0 ? (
        <NoProductsFound />
      ) : (
        <div className="explore-grid">
          {filteredProducts.map((item) => {
            const isInWishlist = wishlistProducts.some(
              (w) => w._id === item._id
            );
            return (
              <ItemCard
                key={item._id}
                item={item}
                onAddToWishlist={onAddToWishlist}
                alreadyInWishlist={isInWishlist}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Explore;
