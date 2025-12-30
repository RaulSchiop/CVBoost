"use client";
import MainBtn from "@/Components/Buttons/MainBtn";
import UnSelectetButton from "@/Components/Buttons/UnSelectedButton";
import PDFInput from "@/Components/InputsComponents/reviewCvInput";
import { useState } from "react";
import { motion } from "motion/react";
import Title from "@/Components/Text/Title";

export default function AiReview() {
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

   //false = upload mode
   //true = existent mode
   const [toggleUpload, setTogleUpload] = useState(false);

   return (
      <div className="min-h-full bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20 p-5 lg:p-20">
         <div className="flex flex-col items-center w-full mb-10">
            <motion.div
               initial={{ opacity: 0, y: -100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ type: "spring", duration: 0.8 }}
               className="bg-gradient-to-br from-pink-500 via-contrast-500/90 to-contrast-500/80 p-2 rounded-xl border border-accent-500"
            >
               {/* AI resume icon */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" text-white w-10 h-10 "
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
               </svg>
            </motion.div>
            <Title title=" Ai Resume Review">
               Get AI-powered ATS Review score based across 5 key criteria
            </Title>
         </div>
         {toggleUpload === false ? (
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
         )}
         <PDFInput toggle={toggleUpload} resumes={resumesList}></PDFInput>
      </div>
   );
}
