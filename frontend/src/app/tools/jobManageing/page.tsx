"use client";

import SmallBtn from "@/Components/Buttons/SmallMainBtn";
import DownList from "@/Components/List/DownList";
import Title from "@/Components/Text/Title";
import { Job } from "@/types/jobsType";
import { motion } from "motion/react";
import { useState } from "react";
import { Status } from "@/types/jobsType";
import GreenBtn from "@/Components/Buttons/GreenBtn";

export default function JobManageing() {
   //status list
   const statusOptions = [
      "saved",
      "applied",
      "interview",
      "offer",
      "accepted",
      "rejected",
   ];

   //hardcoded jobs
   const jobs: Job[] = [
      {
         id: 1,
         title: "hella",
         position: "full stack",
         seniority: "junior",
         date: "20/11/2025",
         status: "accepted",
      },
      {
         id: 2,
         title: "hella",
         position: "full stack",
         seniority: "junior",
         date: "20/11/2025",
         status: "rejected",
      },
      {
         id: 3,
         title: "hella",
         position: "full stack",
         seniority: "junior",
         date: "20/11/2025",
         status: "interview",
      },
      {
         id: 4,
         title: "hella",
         position: "full stack",
         seniority: "junior",
         date: "20/11/2025",
         status: "accepted",
      },
   ];

   const initialStatuses: { [key: number]: Status } = {};
   jobs.forEach((job) => {
      initialStatuses[job.id] = job.status;
   });

   const [status, setStatus] = useState(initialStatuses);

   //later change status on update small button
   const updateStatus = async (status: Status) => {};

   console.log(status);
   const handleStatusChange = (status: Status, id: number) => {
      setStatus((prev) => ({
         ...prev,
         [id]: status,
      }));
   };

   return (
      <div className="min-h-full bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20 p-5 lg:p-20">
         <div className="mb-5">
            <Title title="Jobs List">
               <p>Track and manage job applications in one place.</p>
            </Title>
            <GreenBtn>Create new Application</GreenBtn>
         </div>
         {jobs.length > 0 ? (
            <div>
               {jobs.map((items, index) => (
                  <DownList key={index}>
                     <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                           type: "spring",
                           duration: 1.5,
                           delay: index * 0.1,
                        }}
                        className="bg-purple-500/30 border border-purple-300/20 rounded-lg overflow-hidden mb-5"
                     >
                        <div className=" flex  w-full p-6 items-center  justify-center lg:justify-between gap-2 md:gap-0">
                           <h1 className="text-white text-xl">
                              Job Titile: {items.title}
                           </h1>
                           <div className="flex lg:flex-row flex-col justify-center lg:gap-20 w-full ">
                              <p className="text-white text-wrap">
                                {items.position}
                              </p>
                              <p className="text-white">{items.seniority}</p>
                              <p className="text-white/50">{items.date}</p>
                              <p
                                 className={`${
                                    items.status === "accepted"
                                       ? "text-green-600"
                                       : items.status === "rejected"
                                       ? "text-red-500"
                                       : items.status === "interview"
                                       ? "text-yellow-400"
                                       : items.status === "applied"
                                       ? "text-blue-500"
                                       : items.status === "offer"
                                       ? "text-emerald-500"
                                       : "text-gray-400"
                                 } `}
                              >
                                 {items.status}
                              </p>
                           </div>
                           <div className="flex items-center justify-center gap-4 ">
                              <select
                                 className="text-white"
                                 value={status[items.id]}
                                 onChange={(e) =>
                                    handleStatusChange(
                                       e.target.value as Status,
                                       items.id
                                    )
                                 }
                              >
                                 {statusOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                       {option}
                                    </option>
                                 ))}
                              </select>
                              <SmallBtn>Update status</SmallBtn>
                           </div>
                        </div>
                     </motion.li>
                  </DownList>
               ))}
            </div>
         ) : (
            <div className="w-full h-screen">
               <h1 className="text-2xl font-bold text-white">No jobs yet</h1>
               <p className="text-white/50">
                  Add your first job application to get started
               </p>
            </div>
         )}
      </div>
   );
}
