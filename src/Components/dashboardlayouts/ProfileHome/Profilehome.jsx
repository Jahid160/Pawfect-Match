'use client'
import { useSession } from 'next-auth/react';
import React from 'react';
import Profile from '../ShelterDashboard/Profile';

const Profilehome = () => {
     const { data: session, status } = useSession();
     console.log(session);
     const userRole = session?.user?.role;
     console.log(userRole);
     if (status === "loading") {
          return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
     }
     // if (userRole === "admin") {
     //      return <DashboardMainLayout />;
     // }
     // else if (userRole === "user") {
     //      return <UserDashboardHome></UserDashboardHome>
     // }
     if (userRole === "shelter") {
          return <Profile></Profile>
     }
     // else if (userRole === "doctor") {
     //      return <UserDashboardHome></UserDashboardHome>
     // }
};

export default Profilehome;