"use client";

import MainCard from "../Cards/MainCard";
import SmallBtn from "../Buttons/SmallMainBtn";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import DownList from "../List/DownList";
import { PDFInputPropsType, ResumeItem } from "@/types/resumesTypes";
import MainBtn from "../Buttons/MainBtn";
import { CoverLetter } from "@/types/coverLetterTypes";
import { useLocalStateStore } from "@/stores/slices/LocalStateStore";
import { GET_RESUMES, CREATE_COVERLETTER } from "@/app/Constants/endpoints";
import Skeleton from "../Loadings/Skeleton";
import Alert from "../Alert/Alert";

export default function CoverLetterInput({
   toggle,
   settoggleOpen,
}: PDFInputPropsType) {
   const { token, email } = useLocalStateStore();
   const validEmail = email ? encodeURIComponent(email) : "";

   const [file, setFile] = useState<File>();
   const [dragActive, setDragActive] = useState(false);
   const [selectedCv, setSelectedCv] = useState<string>("");

   const [resumesList, setResumesList] = useState<ResumeItem[]>([]);
   const [fetchLoading, setFetchLoading] = useState<boolean>(false);

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({ on: false, message: "" });
   const [generatedLetter, setGeneratedLetter] = useState<string>("");

   const [coverInput, setCoverInput] = useState<
      Omit<CoverLetter, "id" | "createdDate">
   >({
      name: "",
      Company: "",
      jobTitle: "",
      jobDescription: "",
   });

   function handleCloseAlert() {
      setError({ message: "", on: false });
   }

   useEffect(() => {
      if (!toggle) return;
      if (!token || !email || token === "undefined" || email === "undefined")
         return;

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

            if (!response.ok)
               throw new Error(
                  `Server returned error status: ${response.status}`,
               );

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

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      e.preventDefault();
      const { value, name } = e.target;
      setCoverInput((prev) => ({ ...prev, [name]: value }));
   };

   const handlesSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError({ on: false, message: "" });
      setGeneratedLetter("");

      try {
         const formData = new FormData();

         if (file) {
            formData.append("file", file);
         } else if (selectedCv) {
            const selectedResume = resumesList.find(
               (r) => r.fileName === selectedCv,
            );
            if (!selectedResume) throw new Error("Selected CV not found.");

            const s3Response = await fetch(selectedResume.downloadUrl);
            if (!s3Response.ok)
               throw new Error("Failed to download CV from S3.");

            const fileBlob = await s3Response.blob();
            const reconstructedFile = new File(
               [fileBlob],
               selectedResume.fileName,
               {
                  type: "application/pdf",
               },
            );
            formData.append("file", reconstructedFile);
         } else {
            throw new Error("Please upload a CV or select an existing one.");
         }

         formData.append(
            "data",
            new Blob(
               [
                  JSON.stringify({
                     name: coverInput.name,
                     company: coverInput.Company,
                     jobTitle: coverInput.jobTitle,
                     jobDescription: coverInput.jobDescription,
                  }),
               ],
               { type: "application/json" },
            ),
         );

         const response = await fetch(CREATE_COVERLETTER, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
         });

         if (!response.ok)
            throw new Error(`Request failed with status: ${response.status}`);

         const result = await response.text();
         setGeneratedLetter(result);
      } catch (err: any) {
         setError({ on: true, message: err.message });
      } finally {
         setLoading(false);
      }
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      setFile(files[0]);
      e.currentTarget.value = "";
      settoggleOpen?.(false);
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
      settoggleOpen?.(false);
   };

   const handleSelect = (fileName: string) => {
      setSelectedCv(fileName);
      settoggleOpen?.(false);
   };

   return (
      <div>
         <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="bg-contrast-500/20 rounded-2xl mt-5 backdrop-blur-md"
         >
            {toggle === false ? (
               <div className="w-full h-full flex flex-col items-end justify-center p-3">
                  <div className="p-10 w-full h-[400px]">
                     <label
                        htmlFor="files"
                        className="w-full h-full cursor-pointer"
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
                              <h1 className="text-xl text-white/80">
                                 File Name:{" "}
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
               </div>
            ) : (
               <div className="w-full h-full flex flex-col items-center justify-center py-8 md:py-20 lg:py-10">
                  <h1 className="text-accent-950 mb-5 font-bold text-2xl">
                     Click a CV to use for this cover letter
                  </h1>

                  {fetchLoading && <Skeleton />}

                  {error.on && (
                     <Alert
                        message={error.message}
                        onClose={handleCloseAlert}
                     />
                  )}

                  {!fetchLoading && resumesList.length > 0 ? (
                     <DownList>
                        {resumesList.map((resume, index) => (
                           <motion.li
                              onClick={() => handleSelect(resume.fileName)}
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
                              <MainCard
                                 color={
                                    selectedCv === resume.fileName
                                       ? "bg-accent-500/80"
                                       : "bg-purple-500/25"
                                 }
                                 ClassName="w-full flex items-center justify-between flex-col gap-3 lg:flex-row"
                              >
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
                                 <a
                                    href={resume.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    <SmallBtn ClassName="w-full">View</SmallBtn>
                                 </a>
                              </MainCard>
                           </motion.li>
                        ))}
                     </DownList>
                  ) : (
                     !fetchLoading && (
                        <div className="w-full h-full flex items-center justify-center flex-col mt-20 p-10">
                           <h1 className="text-accent-600 text-3xl font-bold">
                              No Resumes
                           </h1>
                           <p className="text-accent-950/70 text-lg text-center mt-2">
                              Currently you have no Resumes. Create a new Resume
                              with AI.
                           </p>
                        </div>
                     )
                  )}
               </div>
            )}
         </motion.div>

         {(file?.name || selectedCv) && (
            <motion.div
               key="Details"
               initial={{ y: 500, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -500, opacity: 0 }}
               transition={{ duration: 0.5 }}
            >
               <form
                  onSubmit={handlesSubmit}
                  className="flex flex-col gap-4 mt-5"
               >
                  <h1 className="text-white text-3xl">Job Details</h1>
                  <div className="flex gap-5 flex-wrap w-full flex-col lg:flex-row">
                     <input
                        placeholder="Name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        required
                        className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
                     />
                     <input
                        placeholder="Job Title"
                        name="jobTitle"
                        type="text"
                        onChange={handleChange}
                        required
                        className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
                     />
                  </div>
                  <input
                     placeholder="Company"
                     name="Company"
                     type="text"
                     onChange={handleChange}
                     required
                     className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
                  />
                  <textarea
                     placeholder="Job Description"
                     name="jobDescription"
                     rows={4}
                     onChange={handleChange}
                     required
                     className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none resize-none"
                  />

                  {error.on && (
                     <p className="text-red-500 text-sm">{error.message}</p>
                  )}

                  <MainBtn type="submit" className="lg:justify-center">
                     {loading ? "Generating..." : "Generate Cover Letter"}
                  </MainBtn>
               </form>

               {generatedLetter && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     className="mt-8 p-6 bg-contrast-500/20 border border-gray-500/60 rounded-2xl backdrop-blur-md flex justify-center items-center flex-col"
                  >
                     <div className="flex items-center justify-between w-full">
                        <h2 className="text-white text-2xl font-bold mb-4">
                           Generated Cover Letter
                        </h2>
                        <button
                           onClick={() => {
                              navigator.clipboard.writeText(generatedLetter);
                           }}
                           className="  px-4 py-2 bg-accent-500/60 hover:bg-accent-500/80 text-white rounded-lg transition-colors"
                        >
                           Copy to Clipboard
                        </button>
                     </div>
                     <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
                        {generatedLetter}
                     </p>
                  </motion.div>
               )}
            </motion.div>
         )}
      </div>
   );
}
