"use client"

import React from "react";

const loading = () => {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="">
          {/* Logo / Paw animation */}
          <div className="flex items-center justify-center">
            <div className="relative h-16 w-16">
              {/* soft ring */}
              <div className="absolute inset-0 rounded-full bg-orange-200/40 animate-pulse" />
              {/* paw */}
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-3xl animate-bounce">🐾</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-orange-900">
              Finding your next best friend...
            </h2>
            <p className="mt-1 text-sm text-orange-800/80">
              Loading adoptable pets and fresh updates.
            </p>
          </div>

         

          {/* Progress bar */}
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-orange-100">
            <div className="h-full w-1/2 rounded-full bg-orange-500 animate-[loadingbar_1.2s_ease-in-out_infinite]" />
          </div>

          <p className="mt-3 text-center text-xs text-orange-900/70">
            Tip: You can filter by age, size, and location once loaded.
          </p>
        </div>

        {/* keyframes (works without extra config) */}
        <style jsx>{`
          @keyframes loadingbar {
            0% {
              transform: translateX(-80%);
              width: 40%;
            }
            50% {
              transform: translateX(40%);
              width: 60%;
            }
            100% {
              transform: translateX(180%);
              width: 40%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default loading;
