import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import Logo from "@/Components/Logo/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
         <div className="flex flex-col items-center pt-30 gap-6 p-10 min-h-screen bg-gradient-to-bl from-accent-200 via-black to-accent-200">
            <Header></Header>
            {Array.from({ length: 20 }).map((_, i) => (
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
         </div>
         <Footer></Footer>
      </div>
   );
}
