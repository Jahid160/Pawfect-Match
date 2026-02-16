import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pawfect Match",
  description: "Find your perfect pet companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 font-bold text-xl text-black dark:text-white">
                Pawfect Match
              </div>
              <div className="flex space-x-8">
                <a href="/" className="text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  Home
                </a>
                <a href="/about" className="text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  About
                </a>
                <a href="/services" className="text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  Services
                </a>
                <a href="/contact" className="text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
