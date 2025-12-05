"use client";
import { JSX, useState } from "react";
import GreenBtn from "../Buttons/GreenBtn";
import ContrastBtn from "../Buttons/ContrastBtn";

import Logo from "../Logo/Logo";
import Link from "next/link";

import Image from "next/image";
import NoImage from "../../../public/no image.jpg";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import PremiumBtn from "../Buttons/PremiumBtn";

type UserInfo = {
   name: string;
   email: string;
};

export default function SideBarHeader() {
   const pathname = usePathname();
   const [image, setImage] = useState<string | undefined>(undefined);
   const [accInfo, setAccInfo] = useState<UserInfo>({
      name: "Schiop Raul",
      email: "raul.schiop@gmail.com",
   });
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const List: { icon: JSX.Element; link: string; label: string }[] = [
      {
         icon: (
            //house icon
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className={`w-6 h-6  ${
                  pathname === "/tools" ? "text-white" : "text-white/50"
               }`}
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
               />
            </svg>
         ),
         link: "/tools",
         label: "Dashboard",
      },
      {
         icon: (
            /* document writen */
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className={`w-6 h-6  ${
                  pathname === "/tools/resumes" ? "text-white" : "text-white/50"
               }`}
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
               />
            </svg>
         ),
         link: "/tools/resumes",
         label: "My Resumes",
      },
      {
         icon: (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className={`w-6 h-6  ${
                  pathname === "/tools/coverLetter"
                     ? "text-white"
                     : "text-white/50"
               }`}
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
               />
            </svg>
         ),
         link: "/tools/coverLetter",
         label: "Cover Letters",
      },
      {
         icon: (
            //suit case icon
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className={`w-6 h-6  ${
                  pathname === "/tools/transform"
                     ? "text-white"
                     : "text-white/50"
               }`}
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
               />
            </svg>
         ),
         link: "/tools/transform",
         label: "Job Match",
      },
      {
         icon: (
            //stars icon
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className={`w-6 h-6  ${
                  pathname === "/tools/aiReview"
                     ? "text-white"
                     : "text-white/50"
               }`}
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
               />
            </svg>
         ),
         link: "/tools/aiReview",
         label: "Ai Review",
      },
   ];

   return (
      <div className="">
         <div className="fixed left-0 top-0 h-screen w-72 p-5 hidden md:flex flex-col justify-between bg-contrast-500/20 gap-10  overflow-auto">
            <div className="flex  justify-center flex-col gap-3 ">
               <Logo></Logo>
               <Link href="/tools/createResume">
                  <GreenBtn>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-5"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M12 4.5v15m7.5-7.5h-15"
                        />
                     </svg>

                     <h1 className="text-lg text-white/90">
                        Create New Resume
                     </h1>
                  </GreenBtn>
               </Link>
               <ul className="mt-5">
                  {List.map((items, index) => (
                     <motion.li
                        whileHover={{
                           scale: 1.05,

                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,

                           transition: { type: "spring", duration: 0.4 },
                        }}
                        key={index}
                        className={`mb-2  rounded-2xl ${
                           pathname === items.link &&
                           "bg-gradient-to-r from-accent-400/20 via-accent-300/60 to-contrast-500/20 border border-accent-500"
                        } `}
                     >
                        <Link
                           href={items.link}
                           className="flex items-center gap-4 px-3 py-4 "
                        >
                           <div
                              className={` p-2 rounded-xl ${
                                 pathname === items.link
                                    ? "bg-gradient-to-br from-pink-500 to-purple-600 "
                                    : "bg-gray-500/30"
                              }`}
                           >
                              {items.icon}
                           </div>
                           <h1 className="text-white">{items.label}</h1>
                        </Link>
                     </motion.li>
                  ))}
               </ul>
            </div>
            <div className="flex flex-col items-center w-full justify-center gap-3">
               <div className="flex items-center justify-center gap-4 mt-10 bg-contrast-500/50 px-5 py-2 border border-accent-400/20 rounded-2xl">
                  <Link href="/profile">
                     <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-800 flex-shrink-0 ">
                        <Image
                           src={image || NoImage}
                           alt="profile image"
                           fill
                           className="object-cover"
                        />
                     </div>
                  </Link>
                  <div className="flex flex-col  justify-center">
                     <h1 className="text-white text-xl text-bold">
                        {accInfo.name}
                     </h1>
                     <p className="text-notUsed-200/60 ">{accInfo.email}</p>
                  </div>
               </div>
               <div className="w-full flex flex-col gap-2">
                  <PremiumBtn>
                     {/* premium star icon */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-premium-500"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                     </svg>

                     <h1 className="text-premium-500">Upgrade To Pro</h1>
                  </PremiumBtn>

                  <ContrastBtn>
                     {/*sign out icon */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                     </svg>

                     <h1>Sign Out</h1>
                  </ContrastBtn>
               </div>
            </div>
         </div>
         <div className="flex items-center md:hidden justify-between bg-contrast-500/30 p-6">
            <button
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="md:hidden p-2 rounded-lg text-white hover:bg-purple-500/20"
               aria-label="Toggle menu"
            >
               <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  {isMenuOpen ? (
                     <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                     <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
               </svg>
            </button>
            <Link href="/createResume">
               <GreenBtn> Create New Resume</GreenBtn>
            </Link>
         </div>
         {isMenuOpen && (
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="fixed top-[100px] left-4 right-4 p-4  bg-contrast-500/20 backdrop-blur-lg md:hidden z-40 rounded-2xl border border-purple-300/30 shadow-lg"
            >
               <div className="text-white flex flex-col items-center justify-center w-full gap-5 bg-contrast-500/60 backdrop-blur-md border border-purple-300/30 px-5 py-3  rounded-2xl shadow-lg">
                  <ul className="mt-5 w-full">
                     {List.map((items, index) => (
                        <motion.li
                           whileHover={{
                              scale: 1.05,

                              transition: { type: "spring", duration: 0.4 },
                           }}
                           whileTap={{
                              scale: 0.9,

                              transition: { type: "spring", duration: 0.4 },
                           }}
                           key={index}
                           className={`mb-2  rounded-2xl w-full flex items-center justify-center ${
                              pathname === items.link &&
                              "bg-gradient-to-r from-accent-400/20 via-accent-300/60 to-contrast-500/20 border border-accent-500"
                           } `}
                        >
                           <Link
                              onClick={() => setIsMenuOpen(false)}
                              href={items.link}
                              className="flex items-center gap-4 px-5 py-4 w-full"
                           >
                              <div
                                 className={` p-2 rounded-xl ${
                                    pathname === items.link
                                       ? "bg-gradient-to-br from-pink-500 to-purple-600 "
                                       : "bg-gray-500/30"
                                 }`}
                              >
                                 {items.icon}
                              </div>
                              <h1 className="text-white">{items.label}</h1>
                           </Link>
                        </motion.li>
                     ))}
                  </ul>
                  <div className="flex flex-col items-center w-full justify-center gap-3">
                     <div className="flex items-center justify-center w-full gap-4 mt-10 bg-contrast-500/50 px-4 py-2 border border-accent-400/20 rounded-2xl">
                        <Link href="/profile">
                           <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-800 flex-shrink-0 ">
                              <Image
                                 src={image || NoImage}
                                 alt="profile image"
                                 fill
                                 className="object-cover"
                              />
                           </div>
                        </Link>
                        <div className="flex flex-col  justify-center">
                           <h1 className="text-white text-xl text-bold">
                              {accInfo.name}
                           </h1>
                           <p className="text-notUsed-200/60 ">
                              {accInfo.email}
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                     <PremiumBtn>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6 text-premium-500"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                           />
                        </svg>

                        <h1 className="text-premium-500">Upgrade To Pro</h1>
                     </PremiumBtn>

                     <ContrastBtn>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                           />
                        </svg>

                        <h1>Sign Out</h1>
                     </ContrastBtn>
                  </div>
               </div>
            </motion.div>
         )}
      </div>
   );
}
