import React from 'react';
// import { IoIosArrowDropupCircle } from "react-icons/io";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (

    <button
      className="fixed bottom-4 right-4"
      onClick={scrollToTop}
    >
          {/*<IoIosArrowDropupCircle className='w-24 h-24' style={{ color: '#333333' }} />*/}
    </button>
  );
};

export default ScrollToTop;
