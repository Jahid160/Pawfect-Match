import { getPets } from '@/action/server/pets';
import React from 'react';

const allPetsList = async () => {
  const Pets = await getPets()
  console.log(Pets)
  return (
    <div>
      allPetsList
    </div>
  );
};

export default allPetsList;