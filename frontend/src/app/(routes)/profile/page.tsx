"use client";
import MainCard from "@/Components/Cards/MainCard";
import Footer from "@/Components/Footer/Footer";
import Image from "next/image";
import NoImage from "../../../../public/no image.jpg";
import { useState } from "react";
import GrayButton from "@/Components/Buttons/GrayButton";
import MainBtn from "@/Components/Buttons/MainBtn";

export default function ProfilePage() {
   const [image, setImage] = useState<string | undefined>(undefined);
   const [ats, setAts] = useState<number>(45);

   return (
      <div className="min-h-screen flex flex-col items-center">
         <div className="bg-black pt-30 px-5 md:px-20 w-full">
            <h1 className="text-white text-4xl font-bold px-20 mb-10">
               Edit Profile
            </h1>

            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
               <div className="flex flex-col gap-6">
                  <MainCard ClassName="">
                     <div className="flex items-center gap-6 p-6">
                        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                           <Image
                              src={image || NoImage}
                              alt="profile image"
                              fill
                              className="object-cover"
                           />
                        </div>

                        <div className="flex flex-col gap-3 items-center justify-center">
                           <h2 className="text-3xl text-white">Schiop Raul</h2>
                           <GrayButton>Upload New Image</GrayButton>
                        </div>
                     </div>

                     <MainCard ClassName="mb-2">
                        <div className="h-60 ">
                           <div className="flex items-center justify-between">
                              <h1 className="text-white text-2xl font-bold ">
                                 Personal Info
                              </h1>
                              <MainBtn>
                                 Edit Info
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
                        </div>
                     </MainCard>
                  </MainCard>
               </div>
               <div className="lg:sticky top-[50px] self-start ">
                  <MainCard ClassName="w-full">
                     <div className=" w-full">
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
                           <h1 className="text-xl font-bold mb-3">
                              How You Use The app
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
                           <h1 className="lg:text-xl text-2xl font-bold mb-3 text-">
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
                              <p>Needs improvement – may not pass ATS scans.</p>
                           </div>
                        </div>
                     </div>
                  </MainCard>
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
}
