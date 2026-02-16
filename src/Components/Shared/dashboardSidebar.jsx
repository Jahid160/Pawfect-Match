"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardSidebar = () => {
  return (
    <div className="w-[200px] bg-purple-200 text-black h-screen px-3 py-4 fixed top-0 left-0">
      <Link href={"/"}>

        {/* Logo Image      */}
        {/* <Image
          src=""
          alt="Logo"
          width={60}
          height={60}
          className="h-[60px] w-[60px]"
        /> */}
      </Link>

      <div className="flex flex-col gap-2 mt-7">
        <Link href={"/dashboard/profile"}>Profile</Link>
        <Link href={"/dashboard/my-bookings"}>My Booking</Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
