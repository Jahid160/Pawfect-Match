"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-orange-200 bg-orange-50/60 p-8 shadow-sm">
        {/* Icon */}
        <div className="flex items-center justify-center">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-orange-200/50 animate-pulse" />
            <div className="absolute inset-0 grid place-items-center text-4xl">
              🐾
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-bold text-orange-900">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-orange-800/80">
            We ran into an unexpected issue while loading this page. Please try
            again.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-orange-300 bg-white px-5 py-2.5 text-sm font-semibold text-orange-900 hover:bg-orange-50 transition"
          >
            Go Home
          </Link>
        </div>

        {/* Optional error message (safe preview) */}
        {error?.message && (
          <div className="mt-6 rounded-xl border border-orange-200 bg-white/70 p-4">
            <p className="text-xs text-orange-900/70 break-words">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
