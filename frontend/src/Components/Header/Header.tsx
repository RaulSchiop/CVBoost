import LogInBtn from "../Buttons/LogInButton";
import Logo from "../Logo/Logo";
import Link from "next/link";

export default function Header() {
   return (
      <div className="fixed w-full h-10  flex items-center justify-between mt-10 px-15 z-50 ">
         <Logo></Logo>
         <div
            className="text-white flex items-center justify-between 
    bg-purple-500/25 backdrop-blur-md border border-purple-300/30 
    px-5 py-3 w-[50%] rounded-2xl shadow-lg"
         >
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/"
            >
               Home
            </Link>
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/tools"
            >
               Tools
            </Link>
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/contact"
            >
               Contact
            </Link>
            <Link
               className="transition-all duration-300
                       hover:text-accent-800 hover:bg-accent-100
                    active:bg-accent-950 active:text-accent-200 active:scale-90
                       hover:px-3 hover:py-2 hover:rounded-xl
                       transform hover:scale-110"
               href="/profile"
            >
               Profile
            </Link>
         </div>

         <LogInBtn></LogInBtn>
      </div>
   );
}
