"use client";
import { useLocalStateStore } from "@/stores/slices/LocalStateStore";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
import { useEffect } from "react";
import "@/app/globals.css";
import SideBarHeader from "@/Components/Header/SideHeader";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const router = useRouter();

   useEffect(() => {
      useLocalStateStore.getState().rehydrate(); 

      const { token } = useLocalStateStore.getState(); 
      if (!token) {
         router.push("/auth");
      }
   }, []);

   return (
      <div lang="en" className="flex flex-col md:flex-row h-full">
         <SideBarHeader></SideBarHeader>
         <div className="md:pl-72 w-full h-full">{children}</div>
      </div>
   );
}
