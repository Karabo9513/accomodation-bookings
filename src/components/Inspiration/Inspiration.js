
import React from 'react';
import './Inspiration.css';
import One from '../../assets/images/Jo1.png';
import Two from '../../assets/images/jo2.png';
import Three from '../../assets/images/jo3.png';
import Four from '../../assets/images/jo4.png';


const Inspiration = () => {
  return (
    <div className="Inspiration">
      {/* Heading */}
      <p className="Inspiration-Title">Inspiration for your next trip</p>

      {/* Cards Container */}
      <div className="Card-Container">
        {/* Card 1 */}
        <div className="Card">
          <img src={One} alt="property" />
        </div>

        {/* Card 2 */}
        <div className="Card">
          <img src={Two} alt="property" />
        </div>

        {/* Card 3 */}
        <div className="Card">
          <img src={Three} alt="property" />
        </div>

        {/* Card 4 (if needed) */}
        <div className="Card">
          <img src={Four} alt="property" />
        </div>
      </div>
    
    </div>

    
  );
}

export default Inspiration;
