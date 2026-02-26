"use client";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export const Socialform = () => {
  const params = useSearchParams();

  const handleSignIn = async () => {
    const result = await signIn("google", {
      // redirect: "false",
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="flex-1 btn-outline btn btn-error"
      >
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};
