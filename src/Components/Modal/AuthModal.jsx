"use client";

const AuthModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:hover:text-white z-10"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default AuthModal;