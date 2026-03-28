"use client";
import { useState } from "react";
import MainBtn from "../Buttons/MainBtn";
import TopicsPage from "./Topics";
import { TopicResponse } from "@/types/inteviewAsistentTypes";
import { TOPIC_ENDPOINT } from "@/app/Constants/endpoints";
import Skeleton from "../Loadings/SkeletonTopics";

export default function InterviewAsistentInput() {
   const [loading, setLoading] = useState(false);
   const [inputData, setInputData] = useState({
      seniority: "",
      description: "",
      jobTitle: "",
   });
   const [isTopic, setIsTopic] = useState(false);

   const [topics, setTopic] = useState<TopicResponse | null>(null);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const { value, name } = e.target;
      setInputData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
   console.log(inputData);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
         const result = await fetch(TOPIC_ENDPOINT, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
         });

         if (!result.ok) {
            throw new Error("Request failed");
         }

         const data: TopicResponse = await result.json();
         setLoading(false);
         setTopic(data);
         console.log(topics);

         setIsTopic(true);
      } catch (error) {
         console.error(error);
         setLoading(false);
      }
   };

   if (loading) {
      return <Skeleton />;
   }

   return isTopic === false ? (
      <div className="w-[80%] mt-10">
         <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
            <input
               placeholder="Job Title"
               name="jobTitle"
               type="text"
               onChange={handleChange}
               required
               className="text-white placeholder-white/60 bg-contrast-500/20 border border-gray-500/60 focus:border-accent-500 rounded px-4 py-2 focus:outline-none"
            />
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
   ) : (
      topics && <TopicsPage topics={topics}></TopicsPage>
   );
}
