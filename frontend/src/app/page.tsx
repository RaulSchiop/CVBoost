import Logo from "@/Components/Logo/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <main className="flex flex-col items-center gap-6 p-10 min-h-screen ">
         {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white">
               <span className="font-semibold">Glass Box {i + 1}</span>
               <div className="flex gap-4">
                  <Link href="/">Home</Link>
                  <Link href="/tools">Tools</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/profile">Profile</Link>
               </div>
            </div>
         ))}
      </main>
   );
}
