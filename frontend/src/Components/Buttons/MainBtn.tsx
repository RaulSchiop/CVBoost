"use client";
import { motion } from "motion/react";

type Props = {
   children: React.ReactNode;
   onClick?: () => void;
};

export default function MainBtn({ children, onClick }: Props) {
   return (
      <motion.button
         onClick={onClick}
         initial={{ opacity: 0, y: -500 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ type: "spring", duration: 0.5 }}
         whileHover={{
            scale: 1.1,

            transition: { type: "spring", duration: 0.4 },
         }}
         whileTap={{
            scale: 0.9,

            transition: { type: "spring", duration: 0.4 },
         }}
         className="text-white flex items-center justify-between px-5 py-3
    bg-purple-100/50 backdrop-blur-md border border-purple-300/30 rounded-xl shadow-lg s active:bg-white"
      >
         <h1 className="text-white active:text-accent-200">{children}</h1>
      </motion.button>
   );
}
