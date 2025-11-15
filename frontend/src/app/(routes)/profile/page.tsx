"use client";
import MainCard from "@/Components/Cards/MainCard";
import Footer from "@/Components/Footer/Footer";
import Image from "next/image";
import NoImage from "../../../../public/no image.jpg";
import { useState } from "react";
import GrayButton from "@/Components/Buttons/GrayButton";

export default function ProfilePage() {
   const [image, setImage] = useState<string | undefined>(undefined);

   return (
      <div className="min-h-screen flex flex-col items-center">
         <div className="bg-black pt-40 px-5 md:px-20 w-full">
            <h1 className="text-white text-4xl font-bold text-center mb-10">
               Edit Profile
            </h1>

            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
               <div className="flex flex-col gap-6">
                  <MainCard ClassName="">
                     <div className="flex items-center gap-6">
                        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                           <Image
                              src={image || NoImage}
                              alt="profile image"
                              fill
                              className="object-cover"
                           />
                        </div>

                        <div className="flex flex-col gap-3">
                           <h2 className="text-3xl text-white">Schiop Raul</h2>
                           <GrayButton>Upload New Image</GrayButton>
                        </div>
                     </div>
                  </MainCard>
               </div>
               <div className="lg:sticky top-[100px] self-start">
                  <MainCard ClassName="w-full h-[700px]">
                     <div className="flex items-center gap-6">
                        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                           <Image
                              src={image || NoImage}
                              alt="profile image"
                              fill
                              className="object-cover"
                           />
                        </div>

                        <div className="flex flex-col gap-3">
                           <h2 className="text-3xl text-white">Schiop Raul</h2>
                           <GrayButton>Upload New Image</GrayButton>
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
