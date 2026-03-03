"use client"
import LoginForm from "@/components/auth/LoginForm";
import AuthModal from "@/Components/Modal/AuthModal";
import React, { useState } from "react";

const LoginPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Page Content */}
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Open Login
      </button>

      {/* Modal */}
      <AuthModal isOpen={open} onClose={() => setOpen(false)}>
        <LoginForm isModal={true} closeModal={() => setOpen(false)} />
      </AuthModal>
    </div>
  );
};

export default LoginPage;
