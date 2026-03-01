'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  
  const isActive = href === "/" ? path === "/" : path.startsWith(href);

  return (
    <Link 
      href={href} 
      className={`${isActive ? "text-primary" : "text-neutral"} font-bold transition-colors duration-200`}
    >
      {children}
    </Link>
  );
}