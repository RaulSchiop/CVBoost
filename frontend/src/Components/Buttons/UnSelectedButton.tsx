"use client";
import { motion } from "motion/react";

type Props = {
   children: React.ReactNode;
   onClick?: () => void;
   type?: "submit" | "button";
};

export default function UnSelectetButton({ children, onClick, type }: Props) {
   return (
      <motion.button
         type={type}
         onClick={onClick}
         initial={{ opacity: 0, y: -200 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ type: "spring", duration: 0.5 }}
         whileHover={{
            scale: 1.05,

            transition: { type: "spring", duration: 0.4 },
         }}
         whileTap={{
            scale: 0.9,

            transition: { type: "spring", duration: 0.4 },
         }}
         className="text-white flex items-center justify-between px-5 py-3 gap-3
                   backdrop-blur-md bg-ter  rounded-xl active:bg-gray-500/40"
      >
         {children}
      </motion.button>
   );
}
