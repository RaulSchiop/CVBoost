import type { Metadata } from "next";

import "@/app/globals.css";
import SideBarHeader from "@/Components/Header/SideHeader";
export const metadata: Metadata = {};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div lang="en" className="flex flex-col md:flex-row h-full">
         <SideBarHeader></SideBarHeader>
         <div className="md:pl-72 w-full h-full">{children}</div>
      </div>
   );
}
