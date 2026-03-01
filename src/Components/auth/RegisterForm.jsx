"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { FaUser, FaLock, FaEnvelope, FaPaw } from "react-icons/fa";
import { SocialButtons } from "./Socialform";
import { postUser } from "@/action/server/auth";

export const RegisterForm = ({ isModal, closeModal, switchToLogin }) => {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postUser(form);

    if (result.acknowledged) {
      const login = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl,
      });

      if (login?.ok) {
        Swal.fire("Success", "Registered successfully", "success");
        if (isModal && closeModal) closeModal();
        router.push(callbackUrl);
        router.refresh();
      }
    } else {
      Swal.fire("Error", "Registration failed", "error");
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl w-[920px] max-w-[95vw] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-7 md:p-10">
          <h2 className="font-semibold text-gray-800 text-xl text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Name */}
            <div className="relative">
              <FaUser className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="bg-white pr-3 pl-10 border border-gray-200 focus:border-violet-400 rounded-lg outline-none focus:ring-4 focus:ring-violet-100 w-full h-11 text-gray-800 text-sm"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-white pr-3 pl-10 border border-gray-200 focus:border-violet-400 rounded-lg outline-none focus:ring-4 focus:ring-violet-100 w-full h-11 text-gray-800 text-sm"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-white pr-3 pl-10 border border-gray-200 focus:border-violet-400 rounded-lg outline-none focus:ring-4 focus:ring-violet-100 w-full h-11 text-gray-800 text-sm"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 shadow rounded-lg w-full h-11 font-semibold text-white text-sm active:scale-[0.99]"
            >
              Register
            </button>
          </form>

          <div className="mt-5">
            <SocialButtons />
          </div>

          <p className="mt-5 text-gray-600 text-sm text-center">
            Already have an account?{" "}
            {isModal ? (
              <button
                type="button"
                onClick={switchToLogin}
                className="font-semibold text-violet-600 hover:underline"
              >
                Login
              </button>
            ) : (
              <Link
                href="/login"
                className="font-semibold text-violet-600 hover:underline"
              >
                Login
              </Link>
            )}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-violet-100/60 to-indigo-50" />

          <div className="relative flex flex-col justify-between items-center p-10 h-full">
            <div className="flex items-center gap-2 mt-2 text-violet-700">
              <span className="inline-flex justify-center items-center bg-white shadow rounded-full w-9 h-9">
                <FaPaw />
              </span>

              <div className="leading-tight">
                <div className="font-semibold text-base">Pawfect</div>
                <div className="-mt-1 font-semibold text-base">Match</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-[260px] h-[260px]">
                {/* Optional Image */}
              </div>

              <button
                type="button"
                className="bg-white hover:bg-gray-50 shadow px-5 py-2 rounded-lg font-semibold text-gray-700 text-sm"
              >
                Join Now
              </button>
            </div>

            <div className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
