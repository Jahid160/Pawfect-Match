
import Petcarts from '@/components/cards/Petcarts';
import Petdetailscart from '@/components/cards/Petdetailscart';
import Banner from '@/components/home/Banner';
import React from 'react';

const mainPage = () => {
  return (
    <div className="space-y-5" >
      <section>
        <Banner></Banner>
      </section>
      <section>
        <Petcarts></Petcarts>
      </section>
      <section>
        <Petdetailscart></Petdetailscart>
      </section>
    </div>


  );
};

export default mainPage;