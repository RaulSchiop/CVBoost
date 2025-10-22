"use client";
import { motion } from "motion/react";
type Props = {
   message: string;
   onClose: () => void;
};

export default function Alert({ message, onClose }: Props) {
   return (
      <motion.div
         initial={{ opacity: 0, y: -100, scale: 0 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, y: 100, scale: 0 }}
         transition={{ type: "spring", duration: 0.3 }}
         className="fixed top-4 left-[50%] transform -translate-x-1/2 z-50 px-4 py-2 shadow-lg rounded-xl text-white bg-red-500 flex items-center justify-between w-64"
      >
         <h1>{message}</h1>
         <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="font-bold text-xl"
            onClick={onClose}
         >
            <svg
               className="w-4 h-4"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
         </motion.button>
      </motion.div>
   );
}
