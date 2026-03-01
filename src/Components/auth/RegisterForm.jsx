"use client";
import Link from "next/link";
import { useState } from "react";
import { postUser } from "@/action/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

export const RegisterForm = () => {
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
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });
      if (result.ok) {
        Swal.fire("success", "Registered successfully", "success");
        router.push(callbackUrl);
      }
    } else {
      Swal.fire("erro", "Sorry", "error");
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 bg-base-200 min-h-screen">
      {/* <div>
      <h1 className="w-[500px] font-semibold text-6xl">Welcome to Pawfect Match</h1>
    </div> */}
      <div className="bg-base-100 shadow-xl w-full max-w-sm card">
        <div className="card-body">
          <h2 className="font-bold text-2xl text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full input input-bordered"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full input input-bordered"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full input input-bordered"
              onChange={handleChange}
              required
            />

            <button type="submit" className="w-full btn btn-primary">
              Register
            </button>
          </form>

          {/* <SocialButtons /> */}

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
