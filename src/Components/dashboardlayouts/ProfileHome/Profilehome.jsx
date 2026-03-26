"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Shelterprofile from "../ShelterDashboard/ShelterProfile";
import Loading from "../../Loading";

import AdminProfile from "../AdminDashboard/AdminProfile";
import UserProfile from "../UserDashboard/UserProfile";

const Profilehome = () => {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  if (status === "loading") {
    return <Loading />;
  }
  if (userRole === "admin") {
    return <AdminProfile />;
  }
  else if (userRole === "user") {
    return <UserProfile></UserProfile>;

  }
  if (userRole === "shelter") {
    return <Shelterprofile email={session?.user?.email}></Shelterprofile>;
  }
  // else if (userRole === "doctor") {
  //      return <UserDashboardHome></UserDashboardHome>
  // }
};

export default Profilehome;
