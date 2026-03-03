"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link"; // For navigation back to login

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Check Your Inbox",
          text: "If an account exists for that email, we've sent a reset link.",
          icon: "success",
          confirmButtonColor: "#570df8", // Matches primary color
        });
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Network error, please try again later", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Optional: Icon or Logo */}
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="避12a4 4 0 100 8 4 4 0 000-8zM2 17l10 5 10-5M2 12l10 5 10-5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-base-content">
            Forgot Password?
          </h2>
          <p className="text-center text-sm text-base-content/70 mb-4">
            No worries! Enter your email below and we'll send you a link to
            reset it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="input input-bordered focus:input-primary w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              className={`btn btn-primary w-full shadow-lg ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <Link
              href="/login"
              className="link link-primary link-hover text-sm font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
