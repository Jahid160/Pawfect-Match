import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import Script from "next/script"; // Next.js এর Script কম্পোনেন্ট
import SupportButton from "@/components/HelpCenter/SupportButton";

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
          <header className="mx-auto py-2 md:w-11/12 mb-15">
            <Navbar></Navbar>
          </header>

          <main className="mx-auto py-2 md:w-11/12 min-h-[calc(100vh-302px)]">
            {children}
          </main>

          <Script
            src="//code.tidio.co/bnnskbd4agggqkgqz1jtpiuiiw8yt0s7.js"
            strategy="afterInteractive"
          />

          <SupportButton></SupportButton>

          <footer>
            <Footer></Footer>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
