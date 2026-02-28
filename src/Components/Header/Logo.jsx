import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
   <Link href={'/'} className="flex items-center gap-1">
    <Image className="rounded-full"
    alt="Logo-pawfect"
    src={'/logo.jpg'}
    width={30}
    height={30} />
    <h2 className="text-xl font-bold">Paw <span className="text-orange-500">Fect</span></h2>
    </Link>
  );
}