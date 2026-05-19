"use client";

import { useEffect, useState } from "react";
import { totalAdopted } from "@/action/server/pets";

export default function AdoptedCounter() {
  const [adoptedCount, setAdoptedCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchAdopted = async () => {
      try {
        const res = await totalAdopted();
        if (res?.success && isMounted) {
          setAdoptedCount(res.data.adopted);
        }
      } catch (error) {
        console.error("Failed to fetch counter:", error);
      }
    };

    fetchAdopted();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex items-center gap-3 bg-slate-900/80 shadow-inner px-5 py-2 border border-slate-800 rounded-full">
      <span className="bg-orange-500 rounded-full w-2 h-2 animate-ping" />
      <span className="text-slate-300 uppercase tracking-tighter">
        {adoptedCount} Animals adopted
      </span>
    </div>
  );
}
