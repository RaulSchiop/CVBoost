import type { Metadata } from "next";
import Header from "@/Components/Header/Header";
import "@/app/globals.css";
export const metadata: Metadata = {};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div lang="en">
         <div className="bg-gradient-to-bl from-accent-200 via-black to-accent-200 ">
            <Header></Header>
            {children}
         </div>
      </div>
   );
}
