"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password })
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}