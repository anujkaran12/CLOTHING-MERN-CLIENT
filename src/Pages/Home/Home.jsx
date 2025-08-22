import React, { useEffect } from "react";
import "./Home.css";
import img from "../../Assets/00.jpg";
import grid_1_img from "../../Assets/01.jpg";
import grid_2_img from "../../Assets/02.jpg";
import grid_3_img from "../../Assets/03.jpg";
import grid_4_img from "../../Assets/04.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/productsSlice";
import Loading from "../../Components/Utility/Loading/Loading";
import CommonError from "../../Components/Utility/ErrorStates/CommonError";
import ItemCard from "../../Components/ItemCard/ItemCard";

// Grid images with overlay text
const gridImages = [
  { img: grid_1_img, text: "New Arrivals" },
  { img: grid_2_img, text: "Best Sellers" },
  { img: grid_3_img, text: "Trending Now" },
  { img: grid_4_img, text: "Exclusive Deals" },
];

const Home = () => {
  const { productsData, loading, error } = useSelector(
    (state) => state.productsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (productsData.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, productsData.length]);

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="home-hero">
        <img src={img} alt="Hero Banner" className="home-hero-img" loading="lazy" />
        <div className="home-hero-overlay"></div>
        <div className="home-hero-text">
          <h1 className="typing-text">Minimal & Bold</h1>
          <p className="hero-subtitle">
            Latest Fashion Trends for Men, Women & Kids
          </p>
          <p className="hero-desc">
            Find your perfect style from our curated collection. Fashion that
            speaks your personality.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn">Shop Now</button>
          </div>
        </div>
      </section>

      {/* Moving Announcement Bar */}
      <section className="moving-text">
        <span>✨ Big Sale is Live Now! | Free Shipping on Orders Above ₹999 | New Collection Just Dropped ✨</span>
      </section>

      {/* Products Section */}
      <section className="home-products">
        <h2 className="section-heading">Featured Products</h2>
        {loading ? (
          <Loading />
        ) : error ? (
          <CommonError message={error} />
        ) : (
          <div className="home-product-grid">
            {productsData.slice(0, 4).map((product) => (
              <ItemCard key={product._id} item={product} />
            ))}
          </div>
        )}
      </section>

      {/* 2x2 Image Grid with Text */}
      <section className="home-grid">
        {gridImages.map((grid, index) => (
          <div key={index} className="home-grid-item">
            <img src={grid.img} alt={grid.text} loading="lazy" />
            <div className="grid-text-overlay">{grid.text}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;

