export const experimental_ppr = true;
import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import AuthModalProvider from "@/provider/AuthModalProvider";

import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import SupportButton from "@/Components/HelpCenter/SupportButton";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import CartInitializerWrapper from "@/Components/Cart/CartInitializerWrapper";

// import { getCartItems } from "@/action/server/cart";
// import { getServerSession } from "next-auth";
// import CartStoreInitializer from "@/Components/Cart/CartStoreInitializer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

// --- Updated Metadata with Favicon ---
export const metadata = {
  title: "Pawfect Match",
  description: "Adopt your Pet - Find your perfect companion",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession();
  // let initialCartCount = 0;

  // if (session?.user?.email) {
  //   try {
  //     const cartItems = await getCartItems(session.user.email);
  //     initialCartCount = cartItems?.length || 0;
  //   } catch (error) {
  //     console.error("Cart fetch error in layout:", error);
  //   }
  // }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <NextAuthProvider>
          <AuthModalProvider>
            {/* <Suspense fallback={null}>
              <CartInitializerWrapper />
            </Suspense>


            <Toaster position="top-right" reverseOrder={false} />


            <header className="mx-auto mb-16 py-2 md:w-11/12">
              <Suspense
                fallback={
                  <div className="bg-base-100 rounded-xl h-16 animate-pulse" />
                }
              >
                <Navbar />
              </Suspense>
            </header> */}

            {/* Main Content Area */}
            <main className="mx-auto py-2 md:w-11/12 min-h-[calc(100vh-302px)]">
              {children}
            </main>

            {/* Floating Support Button */}
            {/* <SupportButton /> */}

            {/* Footer Section */}
            {/* <footer className="mt-auto">
              <Footer />
            </footer> */}
          </AuthModalProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
