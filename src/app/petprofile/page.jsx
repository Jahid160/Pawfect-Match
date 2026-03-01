import { getPets } from '@/action/server/pets';
import Petcarts from '@/components/cards/Petcarts';
import React from 'react';

const allPetsList = async () => {
  const Pets = await getPets()
  // console.log(Pets)
  return (
    <div>
      <Petcarts pets={Pets}></Petcarts>
    </div>
  );
};

export default allPetsList;