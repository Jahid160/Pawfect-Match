import Link from "next/link";
import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";
const Error404 = () => {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-10">
      <div className="">
        {/* Icon */}
        <div className="flex items-center justify-center">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-orange-200/50 animate-pulse" />
            <div className="absolute inset-0 grid place-items-center text-4xl">
              🐶
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mt-5 text-center">
          <p className="text-xl font-medium text-orange-700">Error 404</p>
          <h1 className="mt-1 text-2xl font-bold text-orange-900">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-orange-800/80">
            Looks like this page ran off to chase a squirrel. Let’s get you back
            to adoptable pets.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition"
          >
            Go to Home
          </Link>

          <Link
            href="/pets"
            className="inline-flex items-center justify-center rounded-xl border border-orange-300 bg-white px-5 py-2.5 text-sm font-semibold text-orange-900 hover:bg-orange-50 transition"
          >
            Browse Pets
          </Link>
        </div>

        {/* Helpful links */}
        {/* <div className="mt-6 rounded-xl border border-orange-200 bg-white/70 p-4">
          <p className="text-sm font-semibold text-orange-900">Quick links</p>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <Link className="text-orange-700 hover:underline" href="/pets">
              🐾 Adopt a pet
            </Link>
            <Link className="text-orange-700 hover:underline" href="/favorites">
              ❤️ Favorites
            </Link>
            <Link className="text-orange-700 hover:underline" href="/about">
              ℹ️ About us
            </Link>
            <Link className="text-orange-700 hover:underline" href="/contact">
              ✉️ Contact
            </Link>
          </div>
        </div> */}

        {/* Tiny footer note */}
        <p className="mt-5 text-center text-xs text-orange-900/60">
          If you typed the address manually, double-check the URL.
        </p>
      </div>
    </div>
  );
};

export default Error404;
