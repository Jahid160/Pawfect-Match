"use client";
import { useEffect } from "react";
import { syncSavedPetsAction } from "@/action/server/savePetsAction";

export const useSyncSavedPets = (savedPets) => {
  useEffect(() => {
    // যদি একদম খালি থাকে তবে সিঙ্ক করার দরকার নেই
    if (!savedPets) return;

    const sync = async () => {
      try {
        await syncSavedPetsAction(savedPets);
      } catch (error) {
        console.error("Sync failed:", error);
      }
    };

    const timeout = setTimeout(sync, 2000);
    return () => clearTimeout(timeout);
  }, [savedPets]);
};