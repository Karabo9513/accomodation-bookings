import React from 'react';
import './Experience.css';
import Rock from '../../assets/images/Chef (2).png';
import Hands from '../../assets/images/Chef (1).png';

function Experience() {
  return (
    <div className="Experience">
      <p className="Experience-title">Discover Airbnb Experiences</p>

      {/* Cards Container */}
      <div className="experience-container">
        {/* Experience Card 1 */}
        <div className="experience-card">
          <img src={Hands} alt="Experience 1" />
        </div>

        {/* Experience Card 2 */}
        <div className="experience-card">
          <img src={Rock} alt="Experience 2" />
        </div>
      </div>
    </div>
  );
}

export default Experience;

