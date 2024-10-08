import React from 'react';
import bigImage from '../../assets/images/big.png'; 
import './Banner.css';

function Banner() {
  return (
    <div className="banner">
      <div className="banner-image">
        <img 
          src={bigImage} 
          alt="Banner image" 
          className="banner-img" 
        />
      </div>
    </div>
  );
}

export default Banner;
