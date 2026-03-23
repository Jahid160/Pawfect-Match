'use client'
import { useSession } from 'next-auth/react';
import React from 'react';
import Shelterprofile from '../ShelterDashboard/ShelterProfile';
import Loading from '../../Loading';

const Profilehome = () => {
     const { data: session, status } = useSession();
     console.log(session);
     const userRole = session?.user?.role;
     if (status === "loading") {
          return <Loading />
     }
     // if (userRole === "admin") {
     //      return <DashboardMainLayout />;
     // }
     // else if (userRole === "user") {
     //      return <UserDashboardHome></UserDashboardHome>
     // }
     if (userRole === "shelter") {
          return <Shelterprofile email={session?.user?.email} ></Shelterprofile>
     }
     // else if (userRole === "doctor") {
     //      return <UserDashboardHome></UserDashboardHome>
     // }
};

export default Profilehome;