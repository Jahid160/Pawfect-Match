import { getUsers } from '@/action/server/users';
import UserManagement from '@/Components/dashboardlayouts/UserManagement';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
export const dynamic = "force-dynamic";
const page = async() => {
      let user = [];
  
    try {
      // Fetching food data from your server action
      user = await getUsers();
    } catch (error) {
      console.error("Error fetching pet foods:", error);
      return (
        <div className="flex flex-col justify-center items-center gap-4 min-h-screen bg-gray-50">
          <div className="bg-red-100 p-6 rounded-full animate-bounce">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
          <div className="text-center">
            <p className="bg-white shadow-sm px-8 py-4 border border-red-100 rounded-3xl font-bold text-red-600 text-lg">
              Unable to load the pantry!
            </p>
            <p className="mt-2 text-gray-400 text-sm italic">Please check your connection and try again.</p>
          </div>
        </div>
      );
    }
  return (
    <div>
      <UserManagement user={user}></UserManagement>
    </div>
  );
};

export default page;