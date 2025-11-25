"use client";
import { motion } from "motion/react";

type Props = {
   children: React.ReactNode;
   onClick?: () => void;
   type?: "submit" | "button";
};

export default function PremiumBtn({ children, onClick, type }: Props) {
   return (
      <motion.button
         type={type}
         onClick={onClick}
         initial={{ opacity: 0, y: -500 }}
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
         className="text-white flex items-center justify-center px-4 py-2 gap-4 w-full
                  bg-premium-500/20 backdrop-blur-md border border-accent-700/30 rounded-xl shadow-lg  hover:bg-premium-500/40    transform active:bg-accent-300"
      >
         {children}
      </motion.button>
   );
}
