"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import AuthModal from "../Modal/AuthModal";
import LoginForm from "../auth/LoginForm";
import { RegisterForm } from "../auth/RegisterForm";


const AuthButtons = () => {
  const { status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("login"); // 'login' or 'register'

  return (
    <div>
      {status === "authenticated" ? (
        <button onClick={() => signOut()} className="btn btn-primary btn-outline">Log Out</button>
      ) : (
        <button 
          onClick={() => { setView("login"); setIsModalOpen(true); }} 
          className="btn btn-primary "
        >
          Login
        </button>
      )}

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {view === "login" ? (
          <LoginForm 
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