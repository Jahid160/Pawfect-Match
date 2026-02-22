import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poopin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Pawfact Match",
  description: "Adop your Pet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poopin.className}  antialiased`}>
        <NextAuthProvider>
          <section>
            <Navbar></Navbar>
          </section>
          <main>{children}</main>
          <section>
            <Footer></Footer>
          </section>
        </NextAuthProvider>
      </body>
    </html>
  );
}
