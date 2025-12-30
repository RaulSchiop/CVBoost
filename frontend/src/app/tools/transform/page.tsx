"use client";
import MainBtn from "@/Components/Buttons/MainBtn";
import UnSelectetButton from "@/Components/Buttons/UnSelectedButton";
import JobMatchInput from "@/Components/InputsComponents/jobMatchInput";
import { motion } from "motion/react";
import { useState } from "react";

export default function JobMatch() {
   const [toggleOpen, settoggleOpen] = useState<boolean>(true);
   const [toggleUpload, setTogleUpload] = useState<boolean>(false);

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
      <div className="w-full min-h-screen p-10 md:p-15 bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20">
         <div className="flex items-center flex-col justify-center mb-10 mt-3 gap-2">
            <motion.h1
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.6 }}
               className="text-white text-5xl font-bold"
            >
               Job Match
            </motion.h1>
            <motion.p
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.4 }}
               className="text-white/50"
            >
               <a className="text-accent-500 text-xl font-bold">AI</a>-powered
               CV transformation tailored to specific job titles and
               descriptions.
            </motion.p>
         </div>
         {toggleOpen &&
            (toggleUpload === false ? (
               <div className="flex bg-contrast-500/40 p-2 w-fit rounded-2xl gap-2">
                  <MainBtn>
                     {/* uload icon */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                     </svg>
                     <p>Upload New</p>
                  </MainBtn>
                  <UnSelectetButton onClick={() => setTogleUpload(true)}>
                     {/* document writen */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                     </svg>
                     <p>Review Existing</p>
                  </UnSelectetButton>
               </div>
            ) : (
               <div className="flex bg-contrast-500/40 p-2 w-fit rounded-2xl gap-2">
                  <UnSelectetButton onClick={() => setTogleUpload(false)}>
                     {/* uload icon */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                     </svg>
                     <p>Upload New</p>
                  </UnSelectetButton>
                  <MainBtn>
                     {/* document writen */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                     </svg>
                     <p>Review Existing</p>
                  </MainBtn>
               </div>
            ))}

         <JobMatchInput
            toggle={toggleUpload}
            resumes={resumesList}
            settoggleOpen={settoggleOpen}
         ></JobMatchInput>
      </div>
   );
}
