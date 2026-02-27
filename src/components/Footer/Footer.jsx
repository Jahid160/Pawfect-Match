import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaPaw } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaPaw className="text-orange-400" />
            PetAdopt Pro
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            Connecting loving families with pets in need. 
            Our mission is to make 
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link href="/pets" className="hover:text-orange-400">Available Pets</Link></li>
            <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-orange-400">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-orange-400"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-400"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} PetAdopt Pro. All rights reserved.
      </div>
    </footer>
  );
}
