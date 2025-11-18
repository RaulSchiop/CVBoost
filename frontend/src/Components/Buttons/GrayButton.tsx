"use client";
import { motion } from "motion/react";

type Props = {
   children: React.ReactNode;
   onClick?: () => void;
   type?: "submit" | "button";
   div?: boolean;
};

export default function GrayButton({
   children,
   onClick,
   type,
   div = false,
}: Props) {
   if (div)
      return (
         <motion.div
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
                  bg-gray-600 backdrop-blur-md border border-accent-700/30 rounded-xl shadow-lg  active:bg-accent-300 "
         >
            {children}
         </motion.div>
      );

   if (!div)
      return (
         <motion.button
            type={type}
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
                  bg-gray-600 backdrop-blur-md border border-accent-700/30 rounded-xl shadow-lg  active:bg-accent-300 "
         >
            {children}
         </motion.button>
      );
}
