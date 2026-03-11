import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import AuthModalProvider from "@/provider/AuthModalProvider"; // এটি ইমপোর্ট করা আছে

import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import SupportButton from "@/components/HelpCenter/SupportButton";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Pawfact Match",
  description: "Adopt your Pet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <NextAuthProvider>
          {/* এখানে <AuthModalProvider> ওপেনিং ট্যাগটি যোগ করা হয়েছে */}
          <AuthModalProvider>
            <Toaster position="top-center" reverseOrder={false} />
            
            <header className="mx-auto py-2 md:w-11/12 mb-15">
              <Navbar />
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