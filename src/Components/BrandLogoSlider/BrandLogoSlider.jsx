


import React from 'react';
import './BrandLogoSlider.css';

const BrandLogoSlider = () => {
  const brands = [
    { id: 1, name: 'Calvin Klein', img: '/path/to/calvin-klein-logo.png' },
    { id: 2, name: 'Nike', img: '/path/to/nike-logo.png' },
    { id: 3, name: 'Adidas', img: '/path/to/adidas-logo.png' },
    { id: 4, name: 'Puma', img: '/path/to/puma-logo.png' },
    { id: 5, name: 'Gucci', img: '/path/to/gucci-logo.png' },
    { id: 6, name: 'Versace', img: '/path/to/versace-logo.png' },
    // Add more brands as needed
  ];

  return (
    <div className="brand-slider-container">
      <div className="brand-slider">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-logo">
            <img src='' alt={brand.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogoSlider;
