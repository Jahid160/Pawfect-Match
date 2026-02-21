import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";



const poopin = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']

})

export const metadata = {
  title: "Pawfact Match",
  description: "Adop your Pet",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>

    <html lang="en">
      
       
      
      <body
        className={`${poppins.className}  antialiased`}
      >
        <section>
          <Navbar></Navbar>
        </section>
        <main className="mx-auto py-2 md:w-11/12 min-h-[calc(100vh-302px)]">
          {children}
        </main>
        <section>
          <Footer></Footer>
        </section>
      </body>
    </html>
        </NextAuthProvider>
  );
}
