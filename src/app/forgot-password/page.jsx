"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire("Success", "Reset link sent to your email", "success");
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-xl font-bold">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-primary w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}