"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { FaUser, FaLock, FaEnvelope, FaPaw } from "react-icons/fa";
import { SocialButtons } from "./Socialform";
import { postUser } from "@/action/server/auth";
import Image from "next/image";

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
  <div className="w-[920px] max-w-[95vw] overflow-hidden rounded-2xl bg-base-100 shadow-2xl shadow-primary/30">
    <div className="grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="p-7 md:p-10 bg-base-100">
        <h2 className="text-center text-xl font-semibold text-neutral">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="h-11 w-full rounded-lg border border-base-300 bg-base-100 pl-10 pr-3 text-sm text-neutral outline-none transition-all
              focus:border-primary focus:ring-4 focus:ring-primary/20"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="h-11 w-full rounded-lg border border-base-300 bg-base-100 pl-10 pr-3 text-sm text-neutral outline-none transition-all
              focus:border-primary focus:ring-4 focus:ring-primary/20"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="h-11 w-full rounded-lg border border-base-300 bg-base-100 pl-10 pr-3 text-sm text-neutral outline-none transition-all
              focus:border-primary focus:ring-4 focus:ring-primary/20"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white shadow-md 
            hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Register
          </button>
        </form>

        <div className="mt-5">
          <SocialButtons />
        </div>

        <p className="mt-5 text-center text-sm text-neutral/70">
          Already have an account?{" "}
          {isModal ? (
            <button
              type="button"
              onClick={switchToLogin}
              className="font-semibold text-primary hover:underline"
            >
              Login
            </button>
          ) : (
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          )}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden md:block h-full w-full overflow-hidden">
        
        <Image
          src="/register.png"
          alt="Register Background"
          fill
          className="object-cover"
          priority
        />

        {/* Warm Adoption Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-neutral/30" />

        <div className="relative z-10 flex h-full flex-col items-center justify-between p-10">
          <div className="h-6" />
        </div>
      </div>
    </div>
  </div>
);
};
