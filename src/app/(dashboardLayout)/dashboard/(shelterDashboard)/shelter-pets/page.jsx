import { getEntriesPets } from '@/action/server/pets';
import ShelterPetlist from '@/components/dashboardlayouts/ShelterDashboard/ShelterPetlist';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const ShelterPets = async ({ searchParams }) => {

     const session = await getServerSession(authOptions);
     const userEmail = session?.user?.email;


     const params = await searchParams;

     const search = params?.search || '';
     const species = params?.species || 'All';
     const page = params?.page || '1';


     const requests = await getEntriesPets({
          search,
          species,
          page,
          email: userEmail
     });

     return (
          <div className="min-h-screen bg-slate-50">
               <ShelterPetlist requests={requests} />
          </div>
     );
};

export default ShelterPets;