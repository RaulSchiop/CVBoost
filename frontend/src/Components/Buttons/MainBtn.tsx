"use client";
import { motion } from "motion/react";

type Props = {
   children: React.ReactNode;
   onClick?: () => void;
   type?: "submit" | "button";
   className?: string;
};

export default function MainBtn({ children, onClick, type, className }: Props) {
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
         className={`text-white flex items-center lg:justify-between justify-center px-5 py-3 gap-3
                  bg-accent-500 backdrop-blur-md border border-accent-700/30 rounded-xl shadow-lg  active:bg-accent-300 ${className}`}
      >
         {children}
      </motion.button>
   );
}
