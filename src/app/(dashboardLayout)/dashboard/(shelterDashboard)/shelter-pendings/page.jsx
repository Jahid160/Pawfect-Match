import { getPending } from '@/action/server/Entries';
import ShelterPendinglist from '@/components/dashboardlayouts/ShelterDashboard/ShelterPendinglist';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const ShelterPending = async () => {
     const session = await getServerSession(authOptions);
     const userEmail = session?.user?.email;
     const pets = await getPending(userEmail);
     // const pets = []

     return (
          <>
               <ShelterPendinglist pets={pets} ></ShelterPendinglist>
          </>
     );
};

export default ShelterPending;