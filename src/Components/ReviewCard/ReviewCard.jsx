import React from "react";
import "./ReviewCard.css";
import Avatar from "react-avatar";

const ReviewCard = () => {
  const review = {
    name: "Anuj Karan",
    date: "September 13, 2025",
    rating: 4.5,
    text: "Absolutely love the quality of the fabric and the design. Fast delivery and seamless customer service. Highly recommended for anyone looking for trendy and durable apparel.",
  };
  return (
    <div className="review-card">
      <div className="review-card-header">
        <Avatar
          name={review.name}
          round={true}
          size="60"
          className="review-avatar"
        />
        <div className="reviewer-details">
          <h4 className="reviewer-name">{review.name}</h4>
          <span className="review-date">{review.date}</span>
        </div>
      </div>

      <div className="review-card-rating">
        {[...Array(5)].map((_, index) =>
          index < review.rating ? (
            <i key={index} className="bi bi-star-fill star filled"></i>
          ) : (
            <i key={index} className="bi bi-star star"></i>
          )
        )}
      </div>

      <p className="review-text">"{review.text}"</p>
    </div>
  );
};

export default ReviewCard;
