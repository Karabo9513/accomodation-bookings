import React from 'react';
import Banner from './components/Banner/Banner';
import Inspiration from './components/Inspiration/Inspiration';
import GiftCards from './components/GiftCards/GiftCards';
import Experience from './components/Experience/Experience';
import PreFooter from './components/PreFooter/PreFooter';
import Footer from './components/Footer/Footer';
import HeaderBottom from './components/HeaderBottom/HeaderBottom';



const Home = () => {
  return (
    <div className="home">
        <HeaderBottom />
        <Banner />
        
        <Inspiration />
        <Experience />
      <GiftCards />
      <PreFooter />
      <Footer />
      
     
      
    </div>
  );
};

export default Home;
