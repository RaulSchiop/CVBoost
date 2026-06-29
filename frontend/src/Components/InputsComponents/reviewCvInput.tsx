"use client";

import { PDFInputPropsType } from "@/types/resumesTypes";
import MainCard from "../Cards/MainCard";
import SmallBtn from "../Buttons/SmallMainBtn";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import MainBtn from "../Buttons/MainBtn";
import DownList from "../List/DownList";
import {
   AI_RESUME_REVIEW_ENDPOINT,
   AI_RESUME_REVIEW_UPDATE,
   GET_RESUMES,
} from "@/app/Constants/endpoints";
import Skeleton from "../Loadings/Skeleton";
import { ReviewResponse } from "@/types/resumeReviewTypes";
import AiReviewOutput from "../AiReviewOutput/AiReviewOutput";
import { useLocalStateStore } from "@/stores/slices/LocalStateStore";
import { ResumeItem } from "../../types/resumesTypes";
import Alert from "../Alert/Alert";

export default function PDFInput({ toggle }: PDFInputPropsType) {
   const [file, setFile] = useState<File>();
   const [dragActive, setDragActive] = useState(false);
   const [loading, setLoading] = useState(false);
   const [reviewResult, setReviewResult] = useState<ReviewResponse>();

   const [resumesList, setResumesList] = useState<ResumeItem[]>([]);
   const [fetchLoading, setFetchLoading] = useState<boolean>(false);
   const [error, setError] = useState({ on: false, message: "" });
   const [rescoringItem, setRescoringItem] = useState("");
   const { token, email } = useLocalStateStore();
   const validEmail = email ? encodeURIComponent(email) : "";
   function handleCloseAlert() {
      setError({ message: "", on: false });
   }

   useEffect(() => {
      if (!toggle) return;
      if (!token || !email || token === "undefined" || email === "undefined") {
         return;
      }

      async function fetchResumes() {
         try {
            setFetchLoading(true);
            setError({ on: false, message: "" });

            const response = await fetch(`${GET_RESUMES}${validEmail}`, {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
               },
            });

            if (!response.ok) {
               throw new Error(
                  `Server returned error status: ${response.status}`,
               );
            }

            const data: ResumeItem[] = await response.json();
            setResumesList(data);
         } catch (err: any) {
            setError({ message: "Failed to load resumes.", on: true });
         } finally {
            setFetchLoading(false);
         }
      }

      fetchResumes();
   }, [token, email, validEmail, toggle]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      setFile(files[0]);
      e.currentTarget.value = "";
   };

   const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const droppedFile = e.dataTransfer.files[0];
      setDragActive(false);
      if (droppedFile.type !== "application/pdf") {
         alert("Only PDF files allowed");
         return;
      }

      setFile(droppedFile);
   };
   const handleSubmit = async (file: File) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const MAX_RETRIES = 10;

      for (let i = 0; i < MAX_RETRIES; i++) {
         try {
            const result = await fetch(AI_RESUME_REVIEW_ENDPOINT, {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${token}`,
               },
               body: formData,
            });

            if (!result.ok) {
               throw new Error(
                  `Attempt ${i + 1} failed with status: ${result.status}`,
               );
            }

            const data = await result.json();

            setReviewResult(data);
            setLoading(false);
            return;
         } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);

            if (i === MAX_RETRIES - 1) {
               setLoading(false);
            } else {
               await new Promise((resolve) => setTimeout(resolve, 1000));
            }
         }
      }
   };
   const handleRescore = async (resume: ResumeItem) => {
      try {
         setRescoringItem(resume.fileName);
         setError({ on: false, message: "" });

         const s3Response = await fetch(resume.downloadUrl);
         if (!s3Response.ok) {
            throw new Error("Failed to download the document from S3.");
         }
         const fileBlob = await s3Response.blob();

         const reconstructedFile = new File([fileBlob], resume.fileName, {
            type: "application/pdf",
         });

         const formData = new FormData();
         formData.append("file", reconstructedFile);

         const MAX_RETRIES = 4;
         let aiData = null;

         for (let i = 0; i < MAX_RETRIES; i++) {
            try {
               const aiResult = await fetch(AI_RESUME_REVIEW_ENDPOINT, {
                  method: "POST",
                  headers: { Authorization: `Bearer ${token}` },
                  body: formData,
               });

               if (!aiResult.ok) {
                  throw new Error(`Status: ${aiResult.status}`);
               }

               aiData = await aiResult.json();
               break;
            } catch (error) {
               console.error(`AI Analysis attempt ${i + 1} failed:`, error);

               if (i === MAX_RETRIES - 1) {
                  throw new Error(
                     "AI review server is currently busy. Please try again later.",
                  );
               }
               await new Promise((resolve) => setTimeout(resolve, 1000));
            }
         }

         const newScoreNumber = aiData.ats_score ?? aiData.score ?? 0;
         console.log(newScoreNumber);
         const updateResult = await fetch(AI_RESUME_REVIEW_UPDATE, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: email,
               fileName: resume.fileName,
               atsScore: newScoreNumber,
            }),
         });

         if (!updateResult.ok) {
            throw new Error(
               "AI analysis completed, but failed to save the new score to database.",
            );
         }

         setResumesList((prevList) =>
            prevList.map((item) =>
               item.fileName === resume.fileName
                  ? { ...item, atsScore: newScoreNumber }
                  : item,
            ),
         );
      } catch (err: any) {
         console.error("Rescore & Update Error:", err);
         setError({
            on: true,
            message:
               err.message ||
               "Failed to completely re-score and save your resume.",
         });
      } finally {
         setRescoringItem("");
      }
   };

   console.log(resumesList);
   if (loading) {
      return <Skeleton></Skeleton>;
   }
   return (
      <motion.div
         initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ type: "spring", duration: 0.8 }}
         className="bg-contrast-500/20 rounded-2xl mt-5  backdrop-blur-md "
      >
         {reviewResult ? (
            <AiReviewOutput result={reviewResult}></AiReviewOutput>
         ) : (
            <div>
               {toggle === false ? (
                  <div className="w-full h-full flex flex-col items-end justify-center p-3">
                     <div className="p-10 w-full h-[400px]">
                        <label
                           htmlFor="files"
                           className="w-full h-full cursor-pointer  "
                        >
                           <div
                              className={`rounded-2xl border-2 border-dashed border-gray-500/80 w-full h-full p-5 flex flex-col items-center justify-center gap-2 ${
                                 dragActive && "cursor-pointer"
                              }`}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                              onDragLeave={() => setDragActive(false)}
                           >
                              <div className="p-2 rounded-xl bg-gradient-to-br from-contrast-500/40 via-contrast-500/20 to-contrast-500/10 border border-gray-500/60">
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
                     {file && (
                        <MainBtn onClick={() => handleSubmit(file)}>
                           Review The Resume
                        </MainBtn>
                     )}
                  </div>
               ) : (
                  <div className="w-full h-full flex items-start justify-center">
                     {fetchLoading && <Skeleton></Skeleton>}

                     {error.on == true && (
                        <Alert
                           message="No resumes found. Try uploading one!"
                           onClose={handleCloseAlert}
                        ></Alert>
                     )}

                     {resumesList.length > 0 ? (
                        <DownList>
                           {resumesList.map((resume, index) => (
                              <motion.li
                                 key={resume.fileName + index}
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
                                 <MainCard ClassName="w-full flex items-center justify-between flex-col gap-3 lg:flex-row">
                                    <div className="w-1/3">
                                       <p
                                          className="truncate"
                                          title={resume.fileName}
                                       >
                                          Name:{" "}
                                          <a className="font-bold">
                                             {resume.fileName}
                                          </a>
                                       </p>
                                       <p className="text-white/60 text-sm">
                                          Date:{" "}
                                          {new Date(
                                             resume.uploadedAt,
                                          ).toLocaleDateString()}
                                       </p>
                                    </div>
                                    <p>
                                       Score:{" "}
                                       <a
                                          className={`font-bold px-2 py-1 rounded border ${
                                             resume.atsScore === null
                                                ? "text-gray-400 border-gray-500/30"
                                                : resume.atsScore <= 50
                                                  ? "text-red-500 border-red-500"
                                                  : resume.atsScore <= 85
                                                    ? "text-yellow-500 border-yellow-500"
                                                    : "text-green-500 border-green-500"
                                          }`}
                                       >
                                          {resume.atsScore !== null
                                             ? resume.atsScore
                                             : "N/A"}
                                       </a>
                                    </p>
                                    <div className="flex gap-2 lg:flex-col">
                                       <a
                                          href={resume.downloadUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                       >
                                          <SmallBtn ClassName="w-full">
                                             View
                                          </SmallBtn>
                                       </a>

                                       <SmallBtn
                                          color="bg-green-500/60"
                                          onClick={() => handleRescore(resume)}
                                       >
                                          Update Score
                                       </SmallBtn>
                                    </div>
                                 </MainCard>
                              </motion.li>
                           ))}
                        </DownList>
                     ) : (
                        <div className="w-full h-full flex items-center justify-center flex-col mt-20 p-10">
                           <h1 className="text-accent-600 text-3xl font-bold">
                              No Resumes
                           </h1>
                           <p className="text-accent-950/70 text-lg text-center mt-2">
                              Currently you have no Resumes. Create a new Resume
                              with AI.
                           </p>
                        </div>
                     )}
                  </div>
               )}
            </div>
         )}
      </motion.div>
   );
}
