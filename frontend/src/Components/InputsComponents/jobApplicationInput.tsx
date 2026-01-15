"use client";

import { Job, Status } from "@/types/jobsType";
import { motion } from "motion/react";
import { useState } from "react";
import MainBtn from "../Buttons/MainBtn";

export default function JobApplicationInput() {
   const [status, setStatus] = useState<Status>();
   const [jobApplication, setJobApplication] = useState<Omit<Job, "id">>({
      title: "",
      position: "",
      seniority: "junior",
      date: "",
      status: "applied",
   });
   const statusOptions = [
      "saved",
      "applied",
      "interview",
      "offer",
      "accepted",
      "rejected",
   ];

   const handleStatusChange = (status: Status) => {
      setStatus(status);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { value, name } = e.target;

      setJobApplication((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   return (
      <motion.div
         initial={{ y: 100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className="min-h-screen"
      >
         <h1 className="text-2xl font-bold text-white mt-10">
            Job Application Details
         </h1>
         <form
            className="flex flex-col gap-4 mt-5"
            onSubmit={() => console.log("to do when backend is done")}
         >
            <div className="flex items-center justify-center w-full gap-4 flex-col md:flex-row">
               <input
                  placeholder="Job Title (ex: Google )"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  required
                  className="text-white w-full placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
               />

               <input
                  placeholder="Position ( ex: Full Stack Developer )"
                  name="position"
                  type="text"
                  onChange={handleChange}
                  required
                  className="text-white w-full placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
               />
            </div>
            <input
               placeholder="Seniority ( Junior or Mid or Senior )"
               name="seniority"
               type="text"
               onChange={handleChange}
               required
               className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
            />
            <input
               placeholder=" Appliction Date ( dd/mm/yyyy )"
               name="date"
               type="text"
               onChange={handleChange}
               required
               className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
            />
            <div className="flex items-center justify-start w-full gap-4 ">
               <select
                  className="text-white text-lg"
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value as Status)}
               >
                  {statusOptions.map((option, index) => (
                     <option key={index} value={option}>
                        {option}
                     </option>
                  ))}
               </select>
            </div>

            <MainBtn type="submit">Create New Application</MainBtn>
         </form>
      </motion.div>
   );
}
