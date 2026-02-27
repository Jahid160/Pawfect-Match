import Link from "next/link";
import { 
  Facebook, Instagram, Twitter, Mail, 
  Phone, MapPin, Heart, PawPrint, ExternalLink 
} from "lucide-react";
import Logo from "../Header/Logo";

export default function Footer() {
  return (
    <div className="w-full bg-white pt-24 pb-12">
      <div className=" mx-auto px-6">
        {/* Main Footer Wrapper */}
        <footer className="relative overflow-hidden bg-[#0f172a] rounded-[3rem] p-10 md:p-20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-800">
          
          {/* Subtle Glow Effects */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Column 1: Brand & Mission (Spans 4 columns) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <Logo></Logo>
                <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                  We believe every pet deserves a loving home. Join us in our mission to rescue, rehabilitate, and rehome animals in need.
                </p>
              </div>

              {/* Social Media - High End Style */}
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    className="group relative w-12 h-12 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl transition-all duration-300 hover:border-orange-500/50 hover:-translate-y-1"
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                    <div className="absolute inset-0 rounded-2xl bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 & 3: Navigation (Spans 4 columns) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Navigation</h3>
                <ul className="space-y-4">
                  {["Browse Pets", "Adoption", "Volunteer", "Success Stories"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-slate-400 hover:text-white flex items-center gap-2 group transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-all"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Support</h3>
                <ul className="space-y-4">
                  {["Help Center", "Pet Care", "Donations", "Shelters"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-slate-400 hover:text-white flex items-center gap-2 group transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-all"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 4: Premium Contact Card (Spans 4 columns) */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] space-y-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors"></div>
                
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  Get in Touch <ExternalLink className="w-4 h-4 text-slate-500" />
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover/item:bg-orange-500 group-hover/item:text-white transition-all">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Location</p>
                      <p className="text-slate-300 text-sm">Petville, CA 90210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover/item:bg-orange-500 group-hover/item:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email Us</p>
                      <p className="text-slate-300 text-sm">hello@pawfect.com</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  Start Adoption <Heart className="w-5 h-5 fill-white" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Branding & Legal */}
          <div className="relative z-10 mt-2 pt-7 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] font-semibold text-slate-500">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
              <p>© {new Date().getFullYear()} Pawfect Adoption</p>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-slate-400">12 Animals adopted today</span>
            </div>
          </div>

        </footer>
      </div>
    </div>
  );
}