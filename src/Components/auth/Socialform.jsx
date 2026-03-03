"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SocialButtons = () => {
  const params = useSearchParams();

  const handleSignIn = async (provider) => {
    await signIn(provider, {
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };

  return (
    <div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleSignIn("google")}
          className="btn btn-outline btn-error flex-1"
        >
          <FaGoogle className="text-lg" />
          Google
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleSignIn("github")}
          className="btn btn-outline btn-neutral flex-1"
        >
          <FaGithub className="text-lg" />
          GitHub
        </button>
      </div>
    </div>
  );
};