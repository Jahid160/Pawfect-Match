import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";

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
        >
        <main>
          {children}
        </main>
      </body>
    </html>
        </NextAuthProvider>
  );
}
