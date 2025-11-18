"use client";
import MainCard from "@/Components/Cards/MainCard";
import Footer from "@/Components/Footer/Footer";
import Image from "next/image";
import NoImage from "../../../../public/no image.jpg";
import { motion } from "motion/react";
import { useState } from "react";
import GrayButton from "@/Components/Buttons/GrayButton";
import MainBtn from "@/Components/Buttons/MainBtn";
import SmallBtn from "@/Components/Buttons/SmallMainBtn";
import Modal from "@/Components/Modal/Modal";
type UserInfo = {
   name: string;
   email: string;
};

export default function ProfilePage() {
   const [image, setImage] = useState<string | undefined>(undefined);
   const [accInfo, setAccInfo] = useState<UserInfo>({
      name: "Schiop Raul",
      email: "raul.schiop@gmail.com",
   });
   const [modal, setModal] = useState<boolean>(false);
   const [ats, setAts] = useState<number>(45);
   const [cvs, setCvs] = useState<UserInfo[]>([
      //demo to make the list
      {
         name: "Schiop Raul",
         email: "raul.schiop@gmail.com",
      },
      {
         name: "Schiop Raul",
         email: "raul.schiop@gmail.com",
      },
      {
         name: "Schiop Raul",
         email: "raul.schiop@gmail.com",
      },
      {
         name: "Schiop Raul",
         email: "raul.schiop@gmail.com",
      },
      {
         name: "Schiop Raul",
         email: "raul.schiop@gmail.com",
      },
   ]);

   //Modal open and close for edit details
   function handelOpenModal() {
      setModal(true);
   }

   function handleCloseModal() {
      setModal(false);
   }

   return (
      <div className="min-h-screen flex flex-col items-center">
         <div className="bg-black pt-30 px-5 md:px-20 w-full mb-10">
            <Modal show={modal} onClose={handleCloseModal}>
               <div className="flex items-center justify-center flex-col">
                  <h1 className="text-white text-xl font-bold">Edit Details</h1>
                  <form>
                     <div className="flex flex-col gap-3">
                        <label className="text-accent-900">Subject</label>
                        <input
                           placeholder="Message Subject"
                           name="subject"
                           className="text-accent-900 border-b border-accent-500/60 outline-0 py-1"
                        ></input>
                        <div className="flex flex-col gap-3">
                           <label className="text-accent-900">Subject</label>
                           <input
                              placeholder="Message Subject"
                              name="subject"
                              className="text-accent-900 border-b border-accent-500/60 outline-0 py-1"
                           ></input>
                        </div>
                        <div className="flex flex-col gap-3">
                           <label className="text-accent-900">Subject</label>
                           <input
                              placeholder="Message Subject"
                              name="subject"
                              className="text-accent-900 border-b border-accent-500/60 outline-0 py-1"
                           ></input>
                        </div>
                     </div>
                  </form>
               </div>
            </Modal>
            <h1 className="text-white text-4xl font-bold px-20 mb-10">
               Profile
            </h1>

            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
               <div className="flex flex-col gap-6 ">
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 50 }}
                     transition={{ duration: 1.2, type: "spring" }}
                     className="bg-gradient-to-bl from-black via-accent-300/70 to-black"
                  >
                     <MainCard>
                        <div className="flex items-center gap-6 p-6 ">
                           <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                              <Image
                                 src={image || NoImage}
                                 alt="profile image"
                                 fill
                                 className="object-cover"
                              />
                           </div>

                           <div className="flex flex-col gap-3 items-center justify-center">
                              <h2 className="text-3xl text-white">
                                 Schiop Raul
                              </h2>
                              <GrayButton>Upload New Image</GrayButton>
                           </div>
                        </div>

                        <MainCard ClassName="mb-2">
                           <div className=" ">
                              <div className="flex items-center justify-between">
                                 <h1 className="text-white text-xl lg:text-2xl font-bold ">
                                    Personal Info
                                 </h1>
                                 <MainBtn onClick={handelOpenModal}>
                                    <p>Edit Info</p>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       strokeWidth={1.5}
                                       stroke="currentColor"
                                       className="size-6"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                       />
                                    </svg>
                                 </MainBtn>
                              </div>
                              <div className="flex items-start md:items-center justify-between flex-col md:flex-row  gap-3 p-6">
                                 <div>
                                    <h2 className="text-gray-200/70">Name</h2>
                                    <p>{accInfo.name}</p>
                                 </div>
                                 <div>
                                    <h2 className="text-gray-200/70">Email</h2>
                                    <p>{accInfo.email}</p>
                                 </div>
                                 <div>
                                    <h2 className="text-gray-200/70">
                                       Curent CV
                                    </h2>
                                    <p>SchiopRaulCV.pdf</p>
                                 </div>
                              </div>
                           </div>
                        </MainCard>
                     </MainCard>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 50 }}
                     transition={{ duration: 1.2, type: "spring" }}
                     className="min-h-10 p-6"
                  >
                     {cvs.length === 0 ? (
                        <p className="text-white/70">
                           No resumes uploaded yet.
                        </p>
                     ) : (
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
                           {cvs.map((file, index) => (
                              <li
                                 key={index}
                                 className="bg-purple-500/10 border border-purple-300/20 rounded-lg overflow-hidden"
                              >
                                 <div className="relative h-40 w-full">
                                    <Image
                                       src={image || NoImage}
                                       alt={`${file.name} preview`}
                                       fill
                                       className="object-cover"
                                    />
                                 </div>
                                 <div className="p-3 flex flex-col gap-2">
                                    <h3 className="text-white text-sm font-medium truncate">
                                       {file.name}
                                    </h3>
                                    <div className="flex items-center  gap-2">
                                       <SmallBtn>
                                          <p className="text-sm">Open</p>
                                       </SmallBtn>
                                       <SmallBtn>
                                          <p className="text-sm">Delete</p>
                                       </SmallBtn>
                                    </div>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     )}
                  </motion.div>
               </div>
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 1.2, type: "spring" }}
                  className="lg:sticky top-[50px] self-start "
               >
                  <div className="bg-gradient-to-bl from-accent-300/70 via-black to-accent-300/70 rounded-2xl">
                     <MainCard ClassName="w-full">
                        <div className=" w-full ">
                           <h1 className="text-xl text-accent-900 font-bold mb-4 mt-5">
                              Profile Info
                           </h1>
                           <ul className="mb-5">
                              <li className="flex items-center justify-between gap-4 mb-3">
                                 <h1 className="text-gray-200">News Letter</h1>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 text-gray-200"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="m4.5 12.75 6 6 9-13.5"
                                    />
                                 </svg>
                              </li>
                              <li className="flex items-center justify-between gap-4 mb-3">
                                 <h1 className="text-gray-200/40">
                                    Profile Picture
                                 </h1>

                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 text-gray-200/40"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M6 18 18 6M6 6l12 12"
                                    />
                                 </svg>
                              </li>
                           </ul>

                           <div>
                              <h1 className="text-xl  text-accent-900 font-bold mb-3">
                                 App Info
                              </h1>
                              <ul>
                                 <li className="flex items-center justify-between gap-4 mb-3">
                                    <h1>Created CV's</h1>
                                    <p>20</p>
                                 </li>
                                 <li className="flex items-center justify-between gap-4 mb-3">
                                    <h1>CV transformation's</h1>
                                    <p>20</p>
                                 </li>
                                 <li className="flex items-center justify-between gap-4 mb-5">
                                    <h1>CV adaptation</h1>
                                    <p>20</p>
                                 </li>
                              </ul>
                           </div>
                           <div className="flex w-full items-center justify-center flex-col py-5">
                              <h1 className="lg:text-xl text-accent-900 text-2xl font-bold mb-3 text-">
                                 Last Ats Cv Score
                              </h1>
                              <div
                                 className={`border-4 p-15 rounded-full ${
                                    ats <= 50
                                       ? " bg-red-500 border-red-500"
                                       : ats <= 85
                                       ? " bg-yellow-500 border-yellow-500"
                                       : " bg-green-500 border-green-500"
                                 }`}
                              >
                                 <h1 className="text-4xl ">{ats}</h1>
                              </div>
                              <div className="mt-3 flex items-center justify-between gap-3 w-[50%] lg:w-full">
                                 <div className="border-4 border-green-500 bg-green-500 p-2 rounded-full "></div>
                                 <p>
                                    Excellent – highly optimized for ATS, should
                                    pass scans.
                                 </p>
                              </div>
                              <div className="mt-3 flex items-center justify-between gap-3 w-[50%] lg:w-full">
                                 <div className="border-4 border-yellow-500 bg-yellow-500 p-2 rounded-full "></div>
                                 <p>
                                    Average – some optimization done, could
                                    improve.
                                 </p>
                              </div>
                              <div className="mt-3 flex items-center justify-between gap-3 w-[50%] lg:w-full">
                                 <div className="border-4 border-red-500 bg-red-500 p-2  rounded-full "></div>
                                 <p>
                                    Needs improvement – may not pass ATS scans.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </MainCard>
                  </div>
               </motion.div>
            </div>
         </div>

         <Footer />
      </div>
   );
}
