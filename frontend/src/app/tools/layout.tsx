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
      <div lang="en">
         <SideBarHeader></SideBarHeader>
         <div className="">{children}</div>
      </div>
   );
}
