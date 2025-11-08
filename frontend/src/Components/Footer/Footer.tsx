import Link from "next/link";
import Logo from "../Logo/Logo";
import MainBtn from "../Buttons/MainBtn";

export default function Footer() {
   return (
      <footer className="relative  w-full bg-black flex flex-col items-center justify-center">
         <div className=" flex items-center justify-center gap-10 md:gap-20 p-5 w-full  flex-col md:flex-row">
            <div className="flex items-center jsutify-center flex-col md:justify-start md:items-start">
               <Logo></Logo>
               <p className="mt-4 text-sm text-white/70 max-w-[200px] text-center md:text-left">
                  Helping your career advance with our AI-powered CV helper
               </p>
            </div>
            <div>
               <h1 className="text-accent-500 text-xl text-bold mb-5 text-center">
                  Quick links
               </h1>
               <div className="flex items-center justify-center ">
                  <div className="flex flex-col gap-3 border-r-2  pr-2 border-accent-500/60">
                     <Link className=" text-white" href="/">
                        Home
                     </Link>
                     <Link className=" text-white " href="/tools">
                        Tools
                     </Link>
                  </div>
                  <div className="flex flex-col pl-2 gap-3">
                     <Link className="text-white" href="/contact">
                        Contact
                     </Link>
                     <Link className="text-white" href="/profile">
                        Profile
                     </Link>
                  </div>
               </div>
            </div>
            <div className="flex items-center jsutify-center flex-col md:items-start">
               <h1 className="text-accent-500 text-xl text-bold mb-2">
                  Contact Us
               </h1>
               <div className="flex flex-col gap-2 text-white/70 items-center md:items-start">
                  <p>Email: support@cvboost.com</p>
                  <Link href="/contact">
                     <MainBtn> Send us a message →</MainBtn>
                  </Link>
               </div>
            </div>
         </div>
         <div className="mt-2 pt-2 border-t border-accent-500/60 text-center md:text-left">
            <p className="text-sm text-white/50">
               © {2025} CVBoost. All rights reserved.
            </p>
         </div>
      </footer>
   );
}
