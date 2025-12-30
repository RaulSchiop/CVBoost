"use client";
import Title from "@/Components/Text/Title";
import { motion } from "motion/react";

export default function Tools() {
   return (
      <div className="w-full min-h-screen p-10 md:p-15 bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20">
         <Title title=" Dashboard">
            {" "}
            Dashboard for all your
            <a className="text-accent-500 text-xl font-bold"> AI</a>-powered
            tools.
         </Title>
      </div>
   );
}
