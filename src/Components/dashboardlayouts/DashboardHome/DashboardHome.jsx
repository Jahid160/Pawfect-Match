"use client";

import React from 'react';
import { useSession } from "next-auth/react";
// import AdminDashboard from "./AdminDashboard";
// import UserDashboard from "./UserDashboard";
// import ShelterDashboard from "./ShelterDashboard";
import DashboardMainLayout from '../DashboardMainLayout';
import UserDashboardHome from '../UserDashboard/UserDashboardHome';
// অন্য ড্যাশবোর্ডগুলো এখানে ইমপোর্ট করুন

const DashboardHome = () => {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  console.log(userRole);

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
if(userRole === "admin"){
  return <DashboardMainLayout />;
}
else if(userRole === "user"){
  return <UserDashboardHome></UserDashboardHome>
}
else if(userRole === "shelter"){
  return <UserDashboardHome></UserDashboardHome>
}
else if(userRole === "doctor"){
  return <UserDashboardHome></UserDashboardHome>
}
  // রোল অনুযায়ী কম্পোনেন্ট রিটার্ন করা
  // switch (userRole) {
  //   case "admin":
  //     return <DashboardMainLayout />;
  //   case "shelter":
  //     return <ShelterDashboard />;
  //   case "user":
  //     return <UserDashboard />;
  //   default:
  //     return <UserDashboard />; // ডিফল্ট হিসেবে ইউজার ড্যাশবোর্ড
  // }
};

export default DashboardHome;