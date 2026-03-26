import { getEntriesPets } from '@/action/server/pets';
import ShelterPetlist from '@/components/dashboardlayouts/ShelterDashboard/ShelterPetlist';
import React from 'react';

const ShelterPets = async ({ searchParams }) => {
     // Ensure searchParams is awaited (Next.js 15 Requirement)
     const params = await searchParams;

     const search = params?.search || '';
     const species = params?.species || 'All';
     const page = params?.page || '1';
     const userEmail = "alaminhossaintanvir42@gmail.com"; // Your session/user email

     // Destructure pets and totalPages from server response
     const { pets, totalPages } = await getEntriesPets({ search, species, page, email: userEmail });

     return (
          <div className="min-h-screen bg-slate-50">
               {/* Passing both data and totalPages for correct pagination logic */}
               <ShelterPetlist requests={pets} totalPages={totalPages} />
          </div>
     );
};

export default ShelterPets;