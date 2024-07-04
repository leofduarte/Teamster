import React from 'react';
import Navbar from '../components_ines/Navbar';
import Intro from '../components_ines/Intro';
import Sponsorships from '../components_ines/Sponsorships';
import AboutUs from '../components_ines/AboutUs';
import Features from '../components_ines/Features';
import Plans from '../components_ines/Plans';
import ScrollToTop from '../components_ines/ScrollToTop';
import Footer from '../components_ines/Footer';
import {Head} from "@inertiajs/react";

const LandingPage = () => {
  return (
    <div className='bg-slate-50 font-poppins'>
        <Head title="Landing"/>
      <Navbar />
      <Intro />
      <Sponsorships />
      <div className='rounded-lg m-12 p-16 bg-white'>
        <AboutUs />
        <Features />
        <Plans />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
