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

    Swal.fire("Success", "Welcome to Pawfect Match", "success");

    if (isModal && closeModal) closeModal();
    router.push(callback);
    router.refresh();
  };

  return (
    <div className="w-[920px]  overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="p-7 md:p-10">
          <h2 className="text-center text-xl font-semibold text-gray-800">
            Log In to Gadget Tech
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
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
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-violet-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-violet-600 text-sm font-semibold text-white shadow hover:bg-violet-700 active:scale-[0.99]"
            >
              Log In
            </button>
          </form>

          <div className="mt-5">
            <SocialButtons />
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            {isModal ? (
              <button
                type="button"
                onClick={switchToRegister}
                className="font-semibold text-violet-600 hover:underline"
              >
                Register
              </button>
            ) : (
              <Link
                href="/register"
                className="font-semibold text-violet-600 hover:underline"
              >
                Register
              </Link>
            )}
          </p>
        </div>

        {/* RIGHT */}
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
                {/* <Image
                  src="/cat.png"
                  alt="Cat"
                  fill
                  className="object-contain drop-shadow"
                  priority
                /> */}
              </div>

              <button
                type="button"
                className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50"
              >
                Log In Now
              </button>
            </div>

            <div className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
