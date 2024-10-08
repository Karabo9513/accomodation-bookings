import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
        <div className="footer-support">
          <h2>Support</h2>
          <ul className="info-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety information</a></li>
            <li><a href="#">Cancellation options</a></li>
            <li><a href="#">Our COVID-19 response</a></li>
            <li><a href="#">Supporting people with disabilities</a></li>
            <li><a href="#">Report a neighborhood concern</a></li>
          </ul>
        </div>

        <div className="footer-community">
          <h2>Community</h2>
          <ul className="info-links">
            <li><a href="#">Airbnb.org disaster relief housing</a></li>
            <li><a href="#">Support: Afghan refugees</a></li>
            <li><a href="#">Celebrating diversity & belonging</a></li>
            <li><a href="#">Combating discrimination</a></li>
          </ul>
        </div>

        <div className="footer-hosting">
          <h2>Hosting</h2>
          <ul className="info-links">
            <li><a href="#">Try hosting</a></li>
            <li><a href="#">AirCover: protection for Hosts</a></li>
            <li><a href="#">Explore hosting resources</a></li>
            <li><a href="#">Visit our community forum</a></li>
            <li><a href="#">How to host responsibly</a></li>
          </ul>
        </div>

        <div className="footer-about">
          <h2>About</h2>
          <ul className="info-links">
            <li><a href="#">Newsroom</a></li>
            <li><a href="#">Learn about new features</a></li>
            <li><a href="#">Letter from our founders</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
            <li><a href="#">Airbnb Luxe</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-rights">
        <div className="footer-terms">
          <p>2022 Airbnb, Inc. Privacy Terms Sitemap</p>
        </div>
        <div className="footer-social-media">
          <span>English (US)</span>
          <span>$ USD</span>
          <span>F</span>
          <span>T</span>
          <span>I</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;