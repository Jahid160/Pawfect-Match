import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Header/Navbar";
import { Suspense } from "react";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
