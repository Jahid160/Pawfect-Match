import Link from "next/link";
import { 
  Facebook, Instagram, Twitter, Mail, 
  Phone, MapPin, Heart, ArrowRight, PawPrint 
} from "lucide-react";

export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full pb-10">
      {/* The Footer Card: 
        - Uses a deep slate/blue-black background with a subtle gradient 
        - Relative position for the background paw-print decoration
      */}
      <footer className="relative overflow-hidden bg-slate-950 text-slate-300 pt-20 pb-10 px-8 md:px-16 rounded-[2.5rem] shadow-2xl border border-white/5">
        
        {/* Decorative Background Element (Paw Prints) */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <PawPrint className="w-64 h-64 rotate-12 text-white" />
        </div>

        {/* Top Section: High-Conversion Newsletter */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 pb-16 border-b border-white/10 mb-16">
          <div className="max-w-lg text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to meet your <span className="text-orange-500">new best friend?</span>
            </h2>
            <p className="text-lg text-slate-400">
              Get weekly updates on new arrivals and adoption events.
            </p>
          </div>
          
          <div className="w-full max-w-md group">
            <div className="relative flex items-center p-2 bg-white/5 border border-white/10 rounded-2xl focus-within:border-orange-500/50 transition-all duration-300">
              <Mail className="ml-4 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-transparent text-white placeholder-slate-500 px-4 py-3 outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-500/20">
                Join <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                 <PawPrint className="w-6 h-6 text-white" />
              </div>
              Paw<span className="text-orange-500">fect</span>
            </Link>
            <p className="text-base text-slate-400 leading-relaxed italic">
              "Until every cage is empty and every wagging tail has a warm porch to call home."
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all duration-300 border border-white/5"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns with custom bullet hover */}
          {[
            { 
              title: "Adopt", 
              links: ["Browse Pets", "Adoption Process", "Success Stories", "Foster a Pet"] 
            },
            { 
              title: "Support", 
              links: ["Volunteer", "Donate Funds", "Wishlist", "Partner Shelters"] 
            }
          ].map((col, idx) => (
            <div key={idx}>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">{col.title}</h3>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}>
                    <Link href="#" className="group flex items-center gap-0 hover:gap-2 text-slate-400 hover:text-orange-400 transition-all duration-300">
                      <span className="w-0 h-0.5 bg-orange-500 group-hover:w-4 transition-all duration-300"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Card */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-slate-400">Petville, CA 90210</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-slate-400">(555) 123-4567</span>
              </div>
              <button className="w-full mt-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                Donate Now <Heart className="w-4 h-4 text-orange-500" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] font-medium text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <p>© {new Date().getFullYear()} Pawfect Adoption</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for animals
          </div>
        </div>

      </footer>
    </div>
  );
}