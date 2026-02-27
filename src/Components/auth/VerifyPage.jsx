"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const email = params.get("email") || "";
  const callbackUrl = params.get("callbackUrl") || "/";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      Swal.fire("Error", "Email and OTP are required", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        Swal.fire("Error", data?.message || "Invalid or expired OTP", "error");
        return;
      }

      Swal.fire("Success", "Account verified. Please login now.", "success");
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Verify OTP</h2>

          <p className="text-sm text-center opacity-80">
            We sent an OTP to <span className="font-semibold">{email}</span>
          </p>

          <form onSubmit={handleVerify} className="space-y-3 mt-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="input input-bordered w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-full"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
