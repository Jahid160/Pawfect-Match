import { Poppins } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Navbar from "@/Components/Navbar/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";
=======
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
>>>>>>> eaa375cdccb9c57dbd15ef33fcf1b3a586fbb9cc

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
        className={`${poopin.className}  antialiased`}
<<<<<<< HEAD
        >
=======
      >
        <section>
          <Navbar></Navbar>
        </section>
>>>>>>> eaa375cdccb9c57dbd15ef33fcf1b3a586fbb9cc
        <main>
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
