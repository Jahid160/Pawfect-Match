"use client";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const AuthModal = ({ isOpen, onClose, children }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      < div className="relative w-full max-w-[95vw] md:max-w-230 animate-in fade-in zoom-in duration-200 bg-white rounded-2xl overflow-hidden" >
        {/* Close Button */}
        < button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 z-50 p-2"
        >
          ✕
        </button >
        {children}
      </div >
    </div >,
    document.body
  );
};

export default AuthModal;