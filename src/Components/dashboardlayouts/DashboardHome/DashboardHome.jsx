"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import ShelterDashboard from "./ShelterDashboard";
// অন্য ড্যাশবোর্ডগুলো এখানে ইমপোর্ট করুন

const DashboardHome = () => {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // রোল অনুযায়ী কম্পোনেন্ট রিটার্ন করা
  switch (userRole) {
    case "admin":
      return <AdminDashboard />;
    case "shelter":
      return <ShelterDashboard />;
    case "user":
      return <UserDashboard />;
    default:
      return <UserDashboard />; // ডিফল্ট হিসেবে ইউজার ড্যাশবোর্ড
  }
};

export default DashboardHome;