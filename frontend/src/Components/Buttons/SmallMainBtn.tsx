"use client";
import { motion } from "motion/react";

type Props = {
   children: React.ReactNode;
   onClick?: () => void;
   type?: "submit" | "button";
   color?: string;
   ClassName?: string;
};

export default function SmallBtn({
   children,
   onClick,
   type,
   color = "bg-accent-700/50",
   ClassName,
}: Props) {
   return (
      <motion.button
         type={type}
         onClick={onClick}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ type: "spring", duration: 0.5 }}
         whileHover={{
            scale: 1.1,

            transition: { type: "spring", duration: 0.4 },
         }}
         whileTap={{
            scale: 0.9,

            transition: { type: "spring", duration: 0.4 },
         }}
         className={`text-white flex items-center justify-between px-2 py-1 gap-3 ${color} 
                   backdrop-blur-md border border-accent-700/30 rounded-xl shadow-lg  active:bg-accent-300 ${ClassName}`}
      >
         {children}
      </motion.button>
   );
}
