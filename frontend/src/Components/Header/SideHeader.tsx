"use client";
import { JSX, useState } from "react";
import GreenBtn from "../Buttons/GreenBtn";
import ContrastBtn from "../Buttons/ContrastBtn";

import Logo from "../Logo/Logo";
import Link from "next/link";

import Image from "next/image";
import NoImage from "../../../public/no image.jpg";
import { usePathname } from "next/navigation";

const List: { icon: JSX.Element; link: string; label: string }[] = [
   {
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white/50"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
         </svg>
      ),
      link: "/tools/dashboard",
      label: "Dashboard",
   },
   {
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white/50"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
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
            className="size-6 text-white/50"
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
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white/50"
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
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white/50"
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

   return (
      <div className="w-[300px] sticky top-0 h-screen m-0 p-5 flex justify-between flex-col bg-contrast-500/50 gap-10">
         <div className="flex  justify-center flex-col gap-3 ">
            <Logo></Logo>

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

               <h1 className="text-lg text-white/90">Create New Resume</h1>
            </GreenBtn>
            <ul className="mt-5">
               {List.map((items, index) => (
                  <li
                     key={index}
                     className="mb-2 bg-contrast-500 rounded-2xl border"
                  >
                     <div className="flex items-center gap-5 px-5 py-4 ">
                        <div className="bg-gray-500/30 p-2 rounded-xl">
                           {items.icon}
                        </div>
                        <Link href={items.link} className="text-white">
                           {items.label}
                        </Link>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
         <div className="flex flex-col items-center w-full justify-center gap-3">
            <div className="flex items-center justify-center gap-4 mt-10 bg-contrast-500/50 px-5 py-2 border border-accent-400/20 rounded-2xl">
               <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-800 flex-shrink-0 ">
                  <Image
                     src={image || NoImage}
                     alt="profile image"
                     fill
                     className="object-cover"
                  />
               </div>
               <div className="flex flex-col  justify-center">
                  <h1 className="text-white text-xl text-bold">
                     {accInfo.name}
                  </h1>
                  <p className="text-notUsed-200/60 ">{accInfo.email}</p>
               </div>
            </div>
            <div className="w-full">
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
      </div>
   );
}
