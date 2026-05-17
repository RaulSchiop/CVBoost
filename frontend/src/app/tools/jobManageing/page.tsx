"use client";

import SmallBtn from "@/Components/Buttons/SmallMainBtn";
import DownList from "@/Components/List/DownList";
import Title from "@/Components/Text/Title";
import { Job } from "@/types/jobsType";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Status } from "@/types/jobsType";
import GreenBtn from "@/Components/Buttons/GreenBtn";
import Link from "next/link";
import {
   GET_APPLICATION_ENDPOINT,
   UPDATE_APPLICATION_STATUS_ENDPOINT,
} from "@/app/Constants/endpoints";
import { useLocalStateStore } from "@/stores/slices/LocalStateStore";
import { useRouter } from "next/navigation";

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
   const [jobs, setJobs] = useState<Job[]>([]);

   const initialStatuses: { [key: string]: Status } = {};
   jobs.forEach((job) => {
      initialStatuses[job.sk] = job.status;
   });
   const router = useRouter();
   const [status, setStatus] = useState(initialStatuses);
   const { email, token, rehydrate } = useLocalStateStore();
   useEffect(() => {
      rehydrate();
   }, [rehydrate]);

   useEffect(() => {
      if (!email || !token) return;

      const getApplications = async () => {
         try {
            const result = await fetch(GET_APPLICATION_ENDPOINT + `/${email}`, {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            if (!result.ok) {
               const errorBody = await result.json();
               console.log("Error body:", errorBody);
               throw new Error(`Failed: ${result.status} - ${errorBody}`);
            }
            const data = await result.json();
            setJobs(data);
            console.log("Get Application:", data);
         } catch (error) {
            console.error(error);
         }
      };

      getApplications();
   }, [email, token]);

   const updateStatus = async (
      newStatus: Status,
      SK: string,
      email: string,
   ) => {
      try {
         const result = await fetch(UPDATE_APPLICATION_STATUS_ENDPOINT, {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, sk: SK, status: newStatus }),
         });
         if (!result.ok) {
            const errorBody = await result.text();
            console.log("Error body:", errorBody);
            throw new Error(`Failed: ${result.status} - ${errorBody}`);
         }
         setJobs((prev) =>
            prev.map((job) =>
               job.sk === SK ? { ...job, status: newStatus } : job,
            ),
         );
         setStatus((prev) => ({ ...prev, [SK]: newStatus }));
      } catch (error) {
         console.error(error);
      }
   };

   const handleStatusChange = (status: Status, SK: string) => {
      setStatus((prev) => ({
         ...prev,
         [SK]: status,
      }));
   };

   console.log(jobs);
   return (
      <div className="min-h-screen bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20 p-5 lg:p-20">
         <div className="mb-5">
            <Title title="Jobs List">
               <p>Track and manage job applications in one place.</p>
            </Title>
            <Link href="/tools/jobManageing/createApplication">
               <GreenBtn>Create new Application</GreenBtn>
            </Link>
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
                              {items.company}
                           </h1>
                           <div className="flex lg:flex-row flex-col justify-center lg:gap-20 w-full ">
                              <p className="text-white text-wrap">
                                 {items.position}
                              </p>
                              <p className="text-white">{items.seniority}</p>
                              <p className="text-white/50">
                                 {items.applicationDate}
                              </p>
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
                                 value={status[items.email]}
                                 onChange={(e) =>
                                    handleStatusChange(
                                       e.target.value as Status,
                                       items.sk,
                                    )
                                 }
                              >
                                 {statusOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                       {option}
                                    </option>
                                 ))}
                              </select>
                              <SmallBtn
                                 onClick={() =>
                                    updateStatus(
                                       status[items.sk],
                                       items.sk,
                                       email!,
                                    )
                                 }
                              >
                                 Update status
                              </SmallBtn>
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
