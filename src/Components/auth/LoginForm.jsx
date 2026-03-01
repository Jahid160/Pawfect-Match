"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation";
// import { SocialButtons } from "./SocialButton";
import { FaUser, FaLock, FaPaw } from "react-icons/fa";
import { SocialButtons } from "./Socialform";

const LoginForm = ({ isModal, closeModal, switchToRegister }) => {
  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: callback,
    });

    if (!result?.ok) {
      Swal.fire(
        "Error",
        "Email/Password not matched. Try Google Login.",
        "error",
      );
      return;
    }

    Swal.fire("Success", "Welcome Back!", "success");

    if (isModal && closeModal) closeModal();
    router.push(callback);
    router.refresh();
  };

  return (
  <div className="w-full max-w-[920px] overflow-hidden rounded-2xl bg-base-100 shadow-2xl shadow-primary/30">
    <div className="grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SIDE */}
      <div className="p-7 md:p-10 bg-base-100">
        <h2 className="text-center text-xl font-semibold text-neutral">
          Log In to Pawfect Match
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Email */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="h-11 w-full rounded-lg border border-base-300 bg-base-100 pl-10 pr-3 text-sm text-neutral outline-none transition-all
              focus:border-primary focus:ring-4 focus:ring-primary/20"
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
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-accent hover:text-primary transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white shadow-md 
            hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Log In
          </button>
        </form>

        <div className="mt-5">
          <SocialButtons />
        </div>

        <p className="mt-5 text-center text-sm text-neutral/70">
          Don’t have an account?{" "}
          {isModal ? (
            <button
              type="button"
              onClick={switchToRegister}
              className="font-semibold text-primary hover:underline"
            >
              Register
            </button>
          ) : (
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          )}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden md:block h-full w-full overflow-hidden">
        <Image
          src="/login.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />

        {/* Warm overlay instead of violet */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-neutral/30" />

        <div className="relative z-10 flex h-full flex-col items-center justify-between p-10">
          <div className="h-6" />
        </div>
      </div>
    </div>
  </div>
);
};

export default LoginForm;
