"use client";
import HeroPageBtn from "@/Components/Buttons/HeroPageBtn";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import Logo from "@/Components/Logo/Logo";
import Title from "@/Components/Text/Title";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { JSX, useState } from "react";
import List from "@/Components/List/ClasicList";
import MainCard from "@/Components/Cards/MainCard";
import ToolsSection from "@/Components/Cards/ThirdCardSectionMainPage";
import PriceingCards from "@/Components/Cards/PricingCards";

const whatHelpsYou: {
   icon: JSX.Element;
   label: string;
   description: string;
}[] = [
   {
      icon: (
         /* document writen */
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-10 h-10  text-white `}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
         </svg>
      ),
      label: "AI CV Builder",
      description:
         "Create or upload your CV and let AI rewrite and improve it to make it stand out.",
   },
   {
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-10 h-10  text-white `}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
         </svg>
      ),
      label: "Cover Letter Generator",
      description:
         "Generate personalized cover letters for each application, tailored to the job and company.",
   },
   {
      icon: (
         //rocket

         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-10 h-10  text-white `}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
         </svg>
      ),
      label: "ATS Optimization",
      description:
         "Optimize your CV with the right keywords, formatting, and layout so it passes ATS and gets noticed.",
   },
];

export default function Home() {
   const [toggle, setToggle] = useState<boolean>(false);

   return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
         <div className="flex flex-col items-center pt-30 gap-6 p-10 min-h-screen ">
            <Header></Header>
            <div className="flex items-center justify-center flex-col gap-5 bg-gradient-to-bl from-black via-accent-500/50 to-black w-full h-[500px] rounded-3xl">
               {/* hero part */}
               <Title title="Boost Your CV with AI">
                  <p className="text-[16px] md:text-2xl mt-2 font-bold  md:w-2xl md:px-20 lg:px-0 text-center bg-gradient-to-r from-accent-900 via-accent-700 to-accent-900 bg-clip-text text-transparent">
                     Create job-winning CVs and personalized cover letters in
                     minutes using powerful AI built for today’s job market.
                  </p>
               </Title>
               <HeroPageBtn>Get Started For Free</HeroPageBtn>

               <div></div>
            </div>
            {/* second section ( what helps you ) */}
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1.5, type: "spring" }}
               className="mt-15 lg:w-full flex items-center justify-center rounded-4xl py-5 md:px-5 lg:px-30 px-5 gap-5 md:gap-0 flex-col  mb-20"
            >
               <h1 className="text-3xl text-white mb-10">
                  How <a className="text-primary-600 text-4xl">CV Boost</a>{" "}
                  Helps You Get Hired{" "}
                  <a className="text-primary-600 text-4xl">?</a>
               </h1>
               <List>
                  {whatHelpsYou.map((items, index) => (
                     <motion.li
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                           type: "spring",
                           duration: 1,
                           delay: index * 0.2,
                        }}
                        whileHover={{
                           scale: 1.05,

                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,

                           transition: { type: "spring", duration: 0.4 },
                        }}
                        key={index}
                     >
                        <MainCard>
                           <div className="flex items-center justify-center gap-4 px-7 py-8 flex-col">
                              <div className="bg-gradient-to-tl from-purple-500/40 via-purple-500/85 to-purple-500/20 p-5 rounded-2xl">
                                 {items.icon}
                              </div>
                              <h1 className="text-white text-2xl">
                                 {items.label}
                              </h1>
                              <p className="text-white/70 text-center">
                                 {items.description}
                              </p>
                           </div>
                        </MainCard>
                     </motion.li>
                  ))}
               </List>
            </motion.div>
         </div>

         {/* third section ( Features you'll  Love ) */}
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="bg-gradient-to-t from-black via-accent-500/50 to-black w-full h-full rounded-3xl mb-20"
         >
            <div className=" lg:w-full flex items-center justify-center rounded-4xl py-5 md:px-5 lg:px-30 px-5 gap-5 md:gap-0 flex-col ">
               <h1 className="text-3xl text-white ">
                  Features <a className="text-primary-600 text-4xl">you'll</a>{" "}
                  Love
               </h1>
            </div>

            <ToolsSection></ToolsSection>
         </motion.div>
         {/* last section for main page( pricing section ) */}
         <motion.div>
            <div className="flex items-center justify-center flex-col">
               <p className="text-accent-500/70 p-2 text-sm border-accent-500/40 border-1 rounded-2xl ">
                  Pricing
               </p>
               <h1 className="text-white text-5xl w-xl text-center">
                  Choose the perfect plan for you to advance your career.
               </h1>
               <p className="text-white/50 mt-2 text-lg">
                  Whether you are a junior or senior, it doesn’t matter.
               </p>
               <PriceingCards toggle={toggle} setToggle={setToggle}></PriceingCards>
            </div>
         </motion.div>
         <Footer></Footer>
      </div>
   );
}
