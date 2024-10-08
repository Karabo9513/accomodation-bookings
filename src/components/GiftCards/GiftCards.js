import React from 'react';
import './GiftCards.css';
import Gift from '../../assets/images/Gift.png';
import SmileImage from '../../assets/images/smile.png';

const GiftCards = () => {
  return (
    <div>
      <div className="Card-banner">
        <div className="Card-content">
          <p className="shop-gift">
            <span className="shop-title">Shop Airbnb gift cards</span>
          </p>
          <button className="Learn-button">Learn more</button>
        </div>
        <img src={Gift} alt="Gift Card" className="Gift-image" />
      </div>
      <div className="question-image">
        <img src={SmileImage} alt="Smile" />
      </div>
    </div>
  );
}

export default GiftCards;


