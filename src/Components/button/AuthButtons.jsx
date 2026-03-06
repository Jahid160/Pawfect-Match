"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import AuthModal from "../Modal/AuthModal";
import LoginForm from "../auth/LoginForm";
import { RegisterForm } from "../auth/RegisterForm";

const AuthButtons = () => {
  const { status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("login");

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="btn btn-primary">
          Dashboard
        </Link>
        <button onClick={() => signOut()} className="btn btn-primary btn-outline">
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setView("login");
          setIsModalOpen(true);
        }}
        className="btn btn-primary"
      >
        Login
      </button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {view === "login" ? (
          <LoginForm
          onClose={() => setIsModalOpen(false)}
            isModal={true}
            closeModal={() => setIsModalOpen(false)}
            switchToRegister={() => setView("register")}
          />
        ) : (
          <RegisterForm
            isModal={true}
            closeModal={() => setIsModalOpen(false)}
            switchToLogin={() => setView("login")}
          />
        )}
      </AuthModal>
    </div>
  );
};

export default AuthButtons;