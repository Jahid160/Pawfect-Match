import { getSinglePets } from '@/action/server/pets';
import PetProfile from '@/components/profile/Petprofile';
import React from 'react';



export default async function Page({ params }) {
  const { id } = await params
  const singlePet = await getSinglePets(id)


  return <PetProfile pet={singlePet} ></PetProfile>
}

