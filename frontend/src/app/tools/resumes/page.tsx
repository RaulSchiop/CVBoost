"use client";
import SmallBtn from "@/Components/Buttons/SmallMainBtn";

import Image from "next/image";
import { useState } from "react";
import NoImage from "../../../../public/no image.jpg";

export default function Resume() {
   const [image, setImage] = useState<string | undefined>(undefined);
   //zustend stateinstad of useState
   const resumesList = [
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         createdDate: "20/11/2025",
         atsScore: 60,
      },
      {
         id: 2,
         name: "CVRAULSCHIOp2.pdf",
         createdDate: "21/11/2025",
         atsScore: 75,
      },
      {
         id: 3,
         name: "CVRAULSCHIOp3.pdf",
         createdDate: "22/11/2025",
         atsScore: 85,
      },
      {
         id: 4,
         name: "CVRAULSCHIOp4.pdf",
         createdDate: "23/11/2025",
         atsScore: 45,
      },
   ];

   return (
      <div className="w-full h-full p-15">
         <div>
            <h1 className="font-bold text-transparent bg-clip-text text-4xl  bg-gradient-to-r from-accent-700 via-pink-500 to-white mb-5">
               Resumes
            </h1>
         </div>
         <div>
            <ul className="flex items-center justify-center flex-wrap gap-5">
               {resumesList.map((file, index) => (
                  <li
                     key={index}
                     className="bg-purple-500/10 border border-purple-300/20 rounded-lg overflow-hidden"
                  >
                     <div className="relative h-40 w-full">
                        <Image
                           src={image || NoImage}
                           alt={`${file.name} preview`}
                           fill
                           className="object-cover"
                        />
                     </div>
                     <div className=" flex flex-col gap-2 p-6">
                        <h3 className="text-white text-lg font-bold truncate">
                           {file.name}
                        </h3>
                        <div className="flex gap-2  ">
                           <SmallBtn ClassName="text-sm">View</SmallBtn>
                           <SmallBtn
                              ClassName="text-sm"
                              color="bg-green-500/60"
                           >
                              Update Score
                           </SmallBtn>
                           <SmallBtn ClassName="text-sm" color="bg-red-500">
                              Delete Resume
                           </SmallBtn>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}
