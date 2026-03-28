"use client";

import React from "react";
import { useSession } from "next-auth/react";
import DashboardMainLayout from "../DashboardMainLayout";
import UserDashboardHome from "../UserDashboard/UserDashboardHome";
import ShelterDashboardHome from "../ShelterDashboard/ShelterDashboardHome";
import DoctorDashboardHome from "../DoctorDashboard/DoctorDashboardHome";

const DashboardHome = () => {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  if (userRole === "admin") {
    return <DashboardMainLayout />;
  } else if (userRole === "shelter") {
    return <ShelterDashboardHome></ShelterDashboardHome>;
  } else if (userRole === "user") {
    return <UserDashboardHome></UserDashboardHome>;
  } else if (userRole === "doctor") {
    return <DoctorDashboardHome></DoctorDashboardHome>;
  }
};

export default DashboardHome;
