"use client";

import { PDFInputPropsType } from "@/types/aiReviewType";
import MainCard from "../Cards/MainCard";
import SmallBtn from "../Buttons/SmallMainBtn";
import { motion } from "motion/react";
import { useState } from "react";
import MainBtn from "../Buttons/MainBtn";

export default function PDFInput({ toggle, resumes }: PDFInputPropsType) {
   const [file, setFile] = useState<File>();
   const [dragActive, setDragActive] = useState(false);
   const atsScore = 60;
   // Sample resume data - replace with actual data from props or API
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

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      setFile(files[0]);
      e.currentTarget.value = "";
   };

   const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
   };
   return (
      <div className="bg-contrast-500/20 rounded-2xl mt-5  backdrop-blur-md ">
         {toggle === false ? (
            <div className="w-full h-full flex flex-col items-end justify-center p-3">
               <div className="p-10 w-full h-[400px]">
                  <label
                     htmlFor="files"
                     className="w-full h-full cursor-pointer  "
                  >
                     <div className="rounded-2xl border-2 border-dashed border-gray-500/80 w-full h-full p-5 flex flex-col items-center justify-center gap-2">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-contrast-500/40 via-contrast-500/20 to-contrast-500/10 border border-gray-500/60">
                           {/* document writen */}
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-14 text-white/50"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                              />
                           </svg>
                        </div>
                        {file ? (
                           <h1 className="text-xl text-white/80 ">
                              File Name :{" "}
                              <a className="font-bold text-accent-700">
                                 {file.name}
                              </a>
                           </h1>
                        ) : (
                           <h1 className="text-xl text-white/80">
                              Upload Resume PDF
                           </h1>
                        )}

                        <p className="text-gray-500/60">
                           Drag & drop or click to browse
                        </p>

                        <input
                           id="files"
                           className="hidden"
                           type="file"
                           accept="application/pdf"
                           onChange={handleInputChange}
                        />
                     </div>
                  </label>
               </div>
               {file && <MainBtn>Review The Resume</MainBtn>}
            </div>
         ) : (
            <div className=" w-full h-full flex items-start justify-center">
               {resumes === false ? (
                  <ul className="p-4 overflow-y-auto lg:overflow-y-hidden w-full h-full ">
                     {resumesList.map((resume, index) => (
                        <motion.li
                           key={resume.id}
                           className="mb-3"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{
                              type: "spring",
                              duration: 1.5,
                              delay: index * 0.1,
                           }}
                        >
                           <MainCard ClassName="w-full flex items-center  justify-between flex-col gap-3 lg:flex-row">
                              <div className="">
                                 <p>
                                    Name:
                                    <a className="font-bold">{resume.name}</a>
                                 </p>
                                 <p className="text-white/60">
                                    Creation Date: {resume.createdDate}
                                 </p>
                              </div>
                              <p>
                                 Current Ats Score:
                                 <a
                                    className={`text-bold ${
                                       resume.atsScore <= 50
                                          ? "text-red-500 border-red-500"
                                          : resume.atsScore <= 85
                                          ? " text-yellow-500 border-yellow-500"
                                          : " text-green-500 border-green-500"
                                    }`}
                                 >
                                    {resume.atsScore}
                                 </a>
                              </p>
                              <div className="flex gap-2 lg:flex-col ">
                                 <SmallBtn>View</SmallBtn>
                                 <SmallBtn color="bg-green-500/60">
                                    Update Score
                                 </SmallBtn>
                                 <SmallBtn color="bg-red-500">
                                    Delete Resume
                                 </SmallBtn>
                              </div>
                           </MainCard>
                        </motion.li>
                     ))}
                  </ul>
               ) : (
                  <p>No Resumes</p>
               )}
            </div>
         )}
      </div>
   );
}
