"use client";

import Link from "next/link";

export default function ProfilePage() {
  // 🔹 Dummy user data (replace later with auth data)
  const user = {
    name: "MD SHAKIL",
    email: "shakil@example.com",
    avatar: "https://via.placeholder.com/150",
    role: "User",
    joined: "January 2025",
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white rounded-3xl shadow-md p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-[#4cc9f0] object-cover"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.name}
            </h1>
            <p className="text-gray-500 text-sm">{user.email}</p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <span className="px-4 py-1 rounded-full bg-[#4cc9f0]/10 text-[#4cc9f0] text-sm font-medium">
                {user.role}
              </span>
              <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                Joined {user.joined}
              </span>
            </div>
          </div>
        </div>

        {/* ================= PROFILE ACTIONS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {/* My Listings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              My Listings
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Manage pets and products you have listed.
            </p>
            <Link
              href="/my-listing"
              className="text-sm font-semibold text-[#4cc9f0] hover:underline"
            >
              View Listings →
            </Link>
          </div>

          {/* My Orders */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              My Orders
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Track your orders and adoption history.
            </p>
            <Link
              href="/orders"
              className="text-sm font-semibold text-[#4cc9f0] hover:underline"
            >
              View Orders →
            </Link>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Account Settings
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Update your personal information.
            </p>
            <button
              disabled
              className="text-sm font-semibold text-gray-400 cursor-not-allowed"
            >
              Edit Profile (Coming Soon)
            </button>
          </div>
        </div>

        {/* ================= LOGOUT ================= */}
        <div className="mt-12 flex justify-center">
          <button
            disabled
            className="px-8 py-3 rounded-full bg-red-500 text-white font-semibold opacity-70 cursor-not-allowed"
          >
            Logout (Auth Needed)
          </button>
        </div>
      </div>
    </section>
  );
}
