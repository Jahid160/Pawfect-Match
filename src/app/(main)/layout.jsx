import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Header/Navbar';
import React from 'react';

const layout = ({children}) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default layout;