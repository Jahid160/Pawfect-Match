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
    <div className="w-[920px] max-w-[95vw] overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-7 md:p-10">
          <h2 className="text-center text-xl font-semibold text-gray-800">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-violet-600 text-sm font-semibold text-white shadow hover:bg-violet-700 active:scale-[0.99]"
            >
              Register
            </button>
          </form>

          <div className="mt-5">
            <SocialButtons />
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
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
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-violet-100/60 to-indigo-50" />

          <div className="relative flex h-full flex-col items-center justify-between p-10">
            <div className="mt-2 flex items-center gap-2 text-violet-700">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                <FaPaw />
              </span>

              <div className="leading-tight">
                <div className="text-base font-semibold">Furry</div>
                <div className="-mt-1 text-base font-semibold">Home</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative h-[260px] w-[260px]">
                {/* Optional Image */}
              </div>

              <button
                type="button"
                className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50"
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
