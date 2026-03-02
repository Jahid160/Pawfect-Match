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
  <div className="bg-base-100 shadow-2xl shadow-primary/30 rounded-2xl w-[920px] max-w-[95vw] overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="bg-base-100 p-7 md:p-10">
        <h2 className="font-semibold text-neutral text-xl text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          
          {/* Name */}
          <div className="relative">
            <FaUser className="top-1/2 left-3 absolute text-neutral/50 -translate-y-1/2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="bg-base-100 pr-3 pl-10 border border-base-300 focus:border-primary rounded-lg outline-none focus:ring-4 focus:ring-primary/20 w-full h-11 text-neutral text-sm transition-all"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="top-1/2 left-3 absolute text-neutral/50 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-base-100 pr-3 pl-10 border border-base-300 focus:border-primary rounded-lg outline-none focus:ring-4 focus:ring-primary/20 w-full h-11 text-neutral text-sm transition-all"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="top-1/2 left-3 absolute text-neutral/50 -translate-y-1/2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-base-100 pr-3 pl-10 border border-base-300 focus:border-primary rounded-lg outline-none focus:ring-4 focus:ring-primary/20 w-full h-11 text-neutral text-sm transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:opacity-90 shadow-md rounded-lg w-full h-11 font-semibold text-white text-sm active:scale-[0.98] transition-all"
          >
            Register
          </button>
        </form>

        <div className="mt-5">
          <SocialButtons />
        </div>

        <p className="mt-5 text-neutral/70 text-sm text-center">
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
      <div className="hidden md:block relative w-full h-full overflow-hidden">
        
        <Image
          src="/register.png"
          alt="Register Background"
          fill
          className="object-cover"
          priority
        />

        {/* Warm Adoption Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-neutral/30" />

        <div className="z-10 relative flex flex-col justify-between items-center p-10 h-full">
          <div className="h-6" />
        </div>
      </div>
    </div>
  </div>
);
};
