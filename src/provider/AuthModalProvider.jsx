"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import AuthModal from "@/Components/Modal/AuthModal";
import LoginForm from "@/Components/auth/LoginForm";
import { RegisterForm } from "@/Components/auth/RegisterForm";

const AuthModalContext = createContext(null);

const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("login");

  const openLoginModal = () => {
    setView("login");
    setIsOpen(true);
  };

  const openRegisterModal = () => {
    setView("register");
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({
      openLoginModal,
      openRegisterModal,
      closeAuthModal,
    }),
    []
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      <AuthModal isOpen={isOpen} onClose={closeAuthModal}>
        {view === "login" ? (
          <LoginForm
            isModal={true}
            closeModal={closeAuthModal}
            switchToRegister={() => setView("register")}
          />
        ) : (
          <RegisterForm
            isModal={true}
            closeModal={closeAuthModal}
            switchToLogin={() => setView("login")}
          />
        )}
      </AuthModal>
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used inside AuthModalProvider");
  }

  return context;
};

export default AuthModalProvider;
