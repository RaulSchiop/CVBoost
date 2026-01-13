"use client";

import { motion } from "motion/react";
import MainBtn from "../Buttons/MainBtn";
import MainCard from "./MainCard";

interface PricingProps {
   toggle: boolean;
   setToggle?: (seter: boolean) => void;
}

export default function PriceingCards({ toggle, setToggle }: PricingProps) {
   const pricin = [
      {
         title: "free",
         monthlyPrice: 0,
         anuallyPrice: 0,
         description: "Build ATS resumes with template",
         best: false,
         pros: [
            "Manual resume builder",
            "3 resumes to manage",
            "1 basic ATS-optimized template",
            "1 Ai Resume Review",
         ],
         button: "Create Free Resume",
      },
      {
         title: "Pro",
         monthlyPrice: 15,
         anuallyPrice: 80,
         description: "Build Resumes with the help of AI",
         best: true,
         pros: [
            "Manual resume builder paired with AI",
            "Manage up to 10 resumes",
            "Create up to 10 cover letters",
            "AI-powered resume reviews",
            "10 job match analyses",
            "Job manageing",
         ],
         button: "Upgrade to Pro",
      },
      {
         title: "Recruitting Plan",
         monthlyPrice: 30,
         anuallyPrice: 150,
         description: "Perfect for your entire job search",
         best: false,
         pros: [
            "Manual resume builder paired with AI",
            "Manage up to 50 resumes",
            "Unlimited cover letter creation",
            "Unlimited AI-powered resume reviews",
            "Unlimited job match analyses",
            "Priority support",
            "Job manageing",
         ],
         button: "Get Recruiting Plan",
      },
   ];

   return (
      <div>
         <div className="flex mt-4   w-full items-center justify-center">
            {/* toggle dif */}
            <div className="border-accent-500/40 border-1 rounded-2xl flex mt-4 px-5 py-3 gap-5 w-fit items-center justify-center">
               <div className="flex gap-3 justify-center items-center">
                  <div
                     className=" rounded-full border-white/50 border-1 h-6 w-6 flex items-center justify-center"
                     onClick={() => setToggle?.(false)}
                  >
                     <div
                        className={` rounded-full ${
                           toggle === false ? "bg-accent-500" : ""
                        }  h-3 w-3 `}
                     ></div>
                  </div>
                  <p className="text-white/80">Monthly</p>
               </div>
               <div className="flex gap-3 justify-center items-center">
                  <div
                     className=" rounded-full border-white/50 border-1 h-6 w-6 flex items-center justify-center"
                     onClick={() => setToggle?.(true)}
                  >
                     <div
                        className={` rounded-full ${
                           toggle && "bg-accent-500"
                        }  h-3 w-3 `}
                     ></div>
                  </div>
                  <p className="text-white/80">Anually</p>
                  <p
                     className={`${
                        toggle ? "text-accent-500/80" : "text-white/50"
                     } `}
                  >
                     Save 15%
                  </p>
               </div>
            </div>
         </div>
         <div className="mt-6 flex items-center justify-center gap-10 ">
            {pricin.map((items, index) => (
               <MainCard
                  key={index}
                  color={
                     items?.best
                        ? "bg-gradient-to-bl from-accent-500/50 via-black to-accent-500/50"
                        : "bg-purple-500/25"
                  }
                  ClassName={`w-[350px] min-h-[500px] `}
               >
                  <div>
                     <div>
                        <p className="text-white/50 mb-2">{items.title}</p>
                        <h1>
                           <a className="text-5xl">
                              {toggle ? items.anuallyPrice : items.monthlyPrice}
                           </a>{" "}
                           {toggle ? "$ per year" : "$ per month"}
                        </h1>
                        <p className="text-white/70 mb-10 mt-2 ">
                           {items.description}
                        </p>
                        <motion.button
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
                           className="flex items-center justify-center py-2 px-5 rounded-2xl bg-accent-900 text-black text-xl"
                        >
                           {items.button}
                        </motion.button>
                     </div>
                     <ul className="mt-10 flex items-start justify-center flex-col gap-2">
                        {items.pros.map((pro, index) => (
                           <li key={index} className="flex gap-2">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="size-6 text-green-500"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                 />
                              </svg>
                              {pro}
                           </li>
                        ))}
                     </ul>
                  </div>
               </MainCard>
            ))}
         </div>
      </div>
   );
}
