"use client";
import GreenBtn from "@/Components/Buttons/GreenBtn";
import SmallBtn from "@/Components/Buttons/SmallMainBtn";
import List from "@/Components/List/ClasicList";
import Title from "@/Components/Text/Title";
import { motion } from "motion/react";
import Link from "next/link";

export default function CoverLetter() {
   const coverLetters = [
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         Company: "hella",
         jobTitle: "softwareEngineer",
         createdDate: "20/11/2025",
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         Company: "hella",
         jobTitle: "softwareEngineer",
         createdDate: "20/11/2025",
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         Company: "hella",
         jobTitle: "softwareEngineer",
         createdDate: "20/11/2025",
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         Company: "hella",
         jobTitle: "softwareEngineer",
         createdDate: "20/11/2025",
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         Company: "hella",
         jobTitle: "softwareEngineer",
         createdDate: "20/11/2025",
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         Company: "hella",
         jobTitle: "softwareEngineer",
         createdDate: "20/11/2025",
      },
      {
         id: 1,
         name: "CVRAULSCHIOp.pdf",
         Company: "hella",
         jobTitle: "softwareEngineer",
         createdDate: "20/11/2025",
      },
   ];
   return (
      <div className="w-full min-h-screen p-10 md:p-15 bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20">
         <Title title="Cover Letters">
            View all your cover letters or create new ones.
         </Title>
         <div className="flex items-center justify-between lg:px-10 mb-5">
            <motion.h2
               initial={{ opacity: 0, y: -500 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.5 }}
               className="text-accent-950 text-xl"
            >
               My Cover Letters
            </motion.h2>
            <Link href={"/tools/coverLetter/createCoverLetters"}>
               <GreenBtn> Create New Cover Letter</GreenBtn>
            </Link>
         </div>

         {coverLetters.length > 0 ? (
            <List>
               {coverLetters.map((file, index) => (
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
                     <div className=" flex flex-col gap-2 p-6 items-center justify-center">
                        <div className=" flex items-start justify-between flex-col mb-2">
                           <h3 className="text-white text-lg font-bold truncate mb-2">
                              {file.name}
                           </h3>
                           <h3 className="text-white/70  font-bold truncate">
                              Job Title: {file.jobTitle}
                           </h3>
                           <h3 className="text-white/70  font-bold truncate">
                              Company: {file.Company}
                           </h3>
                           <h3 className="text-white/70  font-bold truncate ">
                              Date: {file.createdDate}
                           </h3>
                        </div>

                        <div className="flex gap-2  ">
                           <SmallBtn ClassName="text-sm">View</SmallBtn>
                           <SmallBtn ClassName="text-sm bg-green-400">
                              Download
                           </SmallBtn>
                           <SmallBtn ClassName="text-sm" color="bg-red-500">
                              Delete
                           </SmallBtn>
                        </div>
                     </div>
                  </motion.li>
               ))}
            </List>
         ) : (
            <div className="w-full h-full flex items-center justify-center flex-col mt-20">
               <h1 className="text-accent-600 text-3xl font-bold">
                  {" "}
                  No Cover Letter{" "}
               </h1>
               <p className="text-accent-950/70 text-lg text-center">
                  Curentlry you have no Cover Letter. Create new cover letter
                  with Ai.{" "}
               </p>
            </div>
         )}
      </div>
   );
}
