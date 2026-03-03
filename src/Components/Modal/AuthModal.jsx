"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const AuthModal = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  // Ensure we are on the client before rendering the portal
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[95vw] md:max-w-[920px] animate-in fade-in zoom-in duration-200 bg-white rounded-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 z-50 p-2"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body // This sends the HTML to the very end of the page
  );
};

export default AuthModal;