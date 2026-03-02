import { getPets } from '@/action/server/pets';
import Petcarts from '@/components/cards/Petcarts';
import React from 'react';
import { FaPaw, FaExclamationTriangle } from 'react-icons/fa';

const AllPetsList = async () => {
    let Pets = [];
    
    try {
        Pets = await getPets();
    } catch (error) {
        console.error("Error fetching pets:", error);
        return (
            <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
                <div className="bg-red-100 p-4 rounded-full">
                    <FaExclamationTriangle className="text-red-500 text-3xl" />
                </div>
                <p className="bg-white shadow-sm px-6 py-3 border border-red-100 rounded-2xl font-bold text-red-500">
                    Oops! Something went wrong while loading our furry friends.
                </p>
            </div>
        );
    }

    // No Pets Found State (Server side check)
    if (!Pets || Pets.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center px-4 min-h-[80vh] text-center">
                <div className="bg-orange-50 mb-6 p-8 rounded-full">
                    <FaPaw className="opacity-20 text-orange-500 text-6xl animate-pulse" />
                </div>
                <h3 className="font-black text-gray-800 text-3xl tracking-tight">No pets found right now!</h3>
                <p className="mt-2 text-gray-500">Check back later or try refreshing the page.</p>
            </div>
        );
    }

    return (
        <main className="bg-gray-50/50 min-h-screen">
            <div className="pt-10 pb-20">
                <Petcarts pets={Pets} />
            </div>
        </main>
    );
};

export default AllPetsList;