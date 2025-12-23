"use client";
import SmallBtn from "@/Components/Buttons/SmallMainBtn";

import List from "@/Components/List/ClasicList";

import Image from "next/image";
import { useState } from "react";
import NoImage from "../../../../public/no image.jpg";
import GreenBtn from "@/Components/Buttons/GreenBtn";
import Link from "next/link";
import { motion } from "motion/react";

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
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         createdDate: "20/11/2025",
         atsScore: 60,
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         createdDate: "20/11/2025",
         atsScore: 60,
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         createdDate: "20/11/2025",
         atsScore: 60,
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         createdDate: "20/11/2025",
         atsScore: 60,
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         createdDate: "20/11/2025",
         atsScore: 60,
      },

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
      <div className="w-full h-full p-10 md:p-15 bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20">
         <div className="flex items-center flex-col justify-center mb-10 mt-3 gap-2">
            {/* page text */}
            <motion.h1
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.6 }}
               className="text-white text-5xl font-bold"
            >
               Resumes
            </motion.h1>
            <motion.p
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.4 }}
               className="text-white/50"
            >
               View all your past resumes and scores and performance over time.
            </motion.p>
         </div>
         <div>
            <List>
               {resumesList.map((file, index) => (
                  <motion.li
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{
                        type: "spring",
                        duration: 1.5,
                        delay: index * 0.1,
                     }}
                     key={index}
                     className="bg-purple-500/30 border border-purple-300/20 rounded-lg overflow-hidden"
                  >
                     <div className="relative h-60 w-full">
                        <Image
                           src={image || NoImage}
                           alt={`${file.name} preview`}
                           fill
                           className="object-cover"
                        />
                     </div>
                     <div className=" flex flex-col gap-2 p-6">
                        <div className=" flex items-center justify-between">
                           <h3 className="text-white text-lg font-bold truncate">
                              {file.name}
                           </h3>
                           <h3
                              className={`text-bold ${
                                 file.atsScore <= 50
                                    ? "text-red-500 border-red-500"
                                    : file.atsScore <= 85
                                    ? " text-yellow-500 border-yellow-500"
                                    : " text-green-500 border-green-500"
                              }`}
                           >
                              {file.atsScore}
                           </h3>
                        </div>
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
                  </motion.li>
               ))}
            </List>
         </div>
      </div>
   );
}
