
import Link from "next/link";

export default function NavLink({href, children}) {
  return (
    <div>
      <Link href={href}>{children}</Link>
    </div>
  );
}