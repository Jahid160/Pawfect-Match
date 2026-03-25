import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import AuthModalProvider from "@/provider/AuthModalProvider";

import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import SupportButton from "@/Components/HelpCenter/SupportButton";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Pawfect Match",
  description: "Adopt your Pet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <NextAuthProvider>
          <AuthModalProvider>
            <Toaster position="top-right" reverseOrder={false} />

            <header className="mx-auto mb-15 py-2 md:w-11/12">
              <Suspense fallback={<div className="bg-base-100 h-16" />}>
                <Navbar />
              </Suspense>
            </header>

            <main className="mx-auto py-2 md:w-11/12 min-h-[calc(100vh-302px)]">
              {children}
            </main>

            <SupportButton />

            <footer>
              <Footer />
            </footer>
          </AuthModalProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}