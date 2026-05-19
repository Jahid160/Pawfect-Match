import DashboardMainLayout from "@/Components/dashboardlayouts/DashboardMainLayout";
import DoctorDashboardHome from "@/Components/dashboardlayouts/DoctorDashboard/DoctorDashboardHome";
import ShelterDashboardHome from "@/Components/dashboardlayouts/ShelterDashboard/ShelterDashboardHome";
import UserDashboardHome from "@/Components/dashboardlayouts/UserDashboard/UserDashboardHome";
import { getServerSession } from "next-auth";
import React from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

const DashboardPage = async () => {
  await connection();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const userRole = session?.user?.role;
  if (userRole === "admin") {
    return <DashboardMainLayout />;
  } else if (userRole === "shelter") {
    return <ShelterDashboardHome></ShelterDashboardHome>;
  } else if (userRole === "user") {
    return <UserDashboardHome></UserDashboardHome>;
  } else if (userRole === "doctor") {
    return <DoctorDashboardHome></DoctorDashboardHome>;
  } else {
    return <div>you are not Authenticated</div>;
  }
};

export default DashboardPage;
