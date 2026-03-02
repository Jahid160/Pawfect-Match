import Link from "next/link";
import { Heart, PawPrint } from "lucide-react";

export default function Logo() {
  return (
    <Link 
      href={'/'} 
      className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
    >
      {/* Icon Container */}
      <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-purple-500 to-orange-400 shadow-lg shadow-indigo-200/50">
        <Heart 
          className="absolute text-white/20 w-8 h-8 rotate-12" 
          strokeWidth={3} 
        />
        <PawPrint 
          className="relative text-white w-6 h-6 drop-shadow-md" 
          strokeWidth={2.5} 
        />
      </div>

      {/* Text Logo */}
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">
        Paw
        <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
          Fect
        </span>
      </h2>
    </Link>
  );
}