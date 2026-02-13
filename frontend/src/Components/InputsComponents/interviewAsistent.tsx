"use client";
import { useState } from "react";
import MainBtn from "../Buttons/MainBtn";

export default function InterviewAsistentInput() {
   const [inputData, setInputData] = useState({
      seniority: "",
      description: "",
   });

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      e.preventDefault();
      const { value, name } = e.target;
      setInputData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
   console.log(inputData);

   return (
      <div className="w-[80%] mt-10">
         <form
            className="flex flex-col gap-4 mt-5"
            onSubmit={() => console.log("to do")}
         >
            <input
               placeholder="Seniority ( Junior or Mid or Senior )"
               name="seniority"
               type="text"
               onChange={handleChange}
               required
               className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
            />
            <textarea
               name="description"
               onChange={handleChange}
               placeholder="Job Description "
               className="text-white min-h-[150px]  placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
            ></textarea>
            <MainBtn type="submit" className="lg:justify-center">
               Generate
            </MainBtn>
         </form>
      </div>
   );
}
