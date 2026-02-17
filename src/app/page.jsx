import Banner from '@/components/Banner/page';
import Footer from '@/components/Footer/page';
import Navbar from '@/components/Navbar/page';
import React from 'react';

const page = () => {
  return (
    <div className="space-y-5" >
      <section>
        <Navbar></Navbar>
      </section>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <Footer></Footer>
      </section>
    </div>


  );
};

export default page;