"use client";
import SmallBtn from "@/Components/Buttons/SmallMainBtn";
import List from "@/Components/List/ClasicList";
import Image from "next/image";
import { useState, useEffect } from "react";
import NoImage from "../../../../public/no image.jpg";
import Title from "@/Components/Text/Title";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStateStore } from "@/stores/slices/LocalStateStore";
import { ResumeItem } from "../../../types/resumesTypes";
import Skeleton from "@/Components/Loadings/Skeleton";
import Alert from "@/Components/Alert/Alert";
import { useRouter } from "next/navigation";
import { DELETE_RESUME_ENDPOINT, GET_RESUMES } from "@/app/Constants/endpoints";

type AlertType = {
   message: string;
   on: boolean;
};

export default function Resume() {
   const [resumesList, setResumesList] = useState<ResumeItem[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const router = useRouter();
   const [error, setError] = useState<AlertType>({
      message: "",
      on: false,
   });

   const { token, email } = useLocalStateStore();

   function handleGoToUpdate() {
      router.push("/tools/aiReview");
   }

   async function handleDelete(fileName: string) {
      if (!token || !email) {
         setError({ message: "Not authenticated.", on: true });
         return;
      }

      const previous = resumesList;
      // Optimistically remove locally
      setResumesList((prev) => prev.filter((r) => r.fileName !== fileName));
      setLoading(true);
      setError({ message: "", on: false });

      try {
         const response = await fetch(`${DELETE_RESUME_ENDPOINT}`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, fileName }),
         });

         if (!response.ok) {
            throw new Error(`Server returned error status: ${response.status}`);
         }
      } catch (err: any) {
         setResumesList(previous);
         setError({ message: "Failed to delete resume.", on: true });
      } finally {
         setLoading(false);
      }
   }

   function handleCloseAlert() {
      setError({ message: "", on: false });
   }
   useEffect(() => {
      if (!token || !email || token === "undefined" || email === "undefined") {
         return;
      }

      async function fetchResumes() {
         try {
            setLoading(true);
            setError({ message: "", on: false });

            const response = await fetch(`${GET_RESUMES}${email}`, {
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
            setLoading(false);
         }
      }

      fetchResumes();
   }, [token, email]);

   return (
      <div className="w-full min-h-screen p-10 md:p-15 bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20">
         <Title title="Resumes">
            <p className="mb-10">
               View all your past resumes and scores and performance over time.
            </p>
         </Title>

         {loading && <Skeleton></Skeleton>}

         {error.on == true && (
            <Alert
               message="No resumes found. Try uploading one!"
               onClose={handleCloseAlert}
            ></Alert>
         )}

         {!loading && !error.on && resumesList.length === 0 && (
            <div className="text-purple-200/60 text-center py-16 bg-purple-500/10 border border-purple-300/10 rounded-xl backdrop-blur-sm max-w-md mx-auto">
               No resumes found. Try uploading one!
            </div>
         )}

         {!loading && !error.on && resumesList.length > 0 && (
            <div>
               <List>
                  <AnimatePresence>
                     {resumesList.map((file, index) => (
                        <motion.li
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0 }}
                           transition={{
                              type: "spring",
                              duration: 0.8,
                              delay: index * 0.05,
                           }}
                           key={file.fileName + index}
                           className="bg-purple-500/30 border border-purple-300/20 rounded-lg overflow-hidden flex flex-col justify-between"
                        >
                           <a
                              href={file.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full block group/card select-none"
                           >
                              <div className="relative h-56 w-full bg-gradient-to-b from-purple-900/30 to-purple-950/10 border-b border-purple-300/10 flex flex-col items-center justify-center gap-3 transition-colors duration-300 group-hover/card:from-purple-900/40">
                                 <div className="relative p-4 bg-purple-500/10 border border-purple-400/20 rounded-2xl transition-all duration-300 group-hover/card:scale-105 group-hover/card:bg-purple-500/20 shadow-md">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="h-12 w-12 text-purple-300 transition-colors duration-300 group-hover/card:text-purple-100"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                       strokeWidth={1.5}
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                       />
                                    </svg>

                                    <span className="absolute -bottom-1 -right-1 bg-gradient-to-br from-purple-500 to-indigo-600 text-[9px] font-black text-white px-1.5 py-0.5 rounded shadow tracking-wider uppercase">
                                       {file.fileName.split(".").pop() || "PDF"}
                                    </span>
                                 </div>

                                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-purple-950/80 border border-purple-400/30 text-[11px] font-medium text-purple-200 px-3 py-1 rounded-full opacity-0 translate-y-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                                    <span>Click to open view</span>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       strokeWidth={2}
                                       stroke="currentColor"
                                       className="w-3 h-3"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                       />
                                    </svg>
                                 </div>
                              </div>
                           </a>

                           <div className="flex flex-col gap-2 p-6 mt-auto">
                              <div className="flex items-center justify-between gap-4">
                                 <h3
                                    className="text-white text-lg font-bold truncate max-w-[70%]"
                                    title={file.fileName}
                                 >
                                    {file.fileName}
                                 </h3>
                                 <div
                                    className={`font-bold px-2 py-1 rounded text-sm ${
                                       file.atsScore === null
                                          ? "text-gray-400 border border-gray-500/30"
                                          : file.atsScore <= 50
                                            ? "text-red-500 border border-red-500/30"
                                            : file.atsScore <= 85
                                              ? "text-yellow-500 border border-yellow-500/30"
                                              : "text-green-500 border border-green-500/30"
                                    }`}
                                 >
                                    {file.atsScore !== null
                                       ? `Score: ${file.atsScore}`
                                       : "Unscored"}
                                 </div>
                              </div>

                              <p className="text-gray-400 text-xs">
                                 Uploaded:{" "}
                                 {new Date(
                                    file.uploadedAt,
                                 ).toLocaleDateString()}
                              </p>

                              <div className="flex gap-2 mt-4">
                                 {file.atsScore === null ? (
                                    <SmallBtn
                                       ClassName="text-sm"
                                       color="bg-green-500/60"
                                       onClick={handleGoToUpdate}
                                    >
                                       Update
                                    </SmallBtn>
                                 ) : (
                                    <></>
                                 )}

                                 <SmallBtn
                                    ClassName="text-sm"
                                    color="bg-red-500"
                                    onClick={() => handleDelete(file.fileName)}
                                 >
                                    Delete
                                 </SmallBtn>
                              </div>
                           </div>
                        </motion.li>
                     ))}
                  </AnimatePresence>
               </List>
            </div>
         )}
      </div>
   );
}
