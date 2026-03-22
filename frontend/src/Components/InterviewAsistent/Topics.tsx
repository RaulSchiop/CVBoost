"use client";

import { QuestionResponse, TopicResponse } from "@/types/inteviewAsistentTypes";
import MainBtn from "../Buttons/MainBtn";
import SmallBtn from "../Buttons/SmallMainBtn";
import { useState } from "react";
import { QUESTION_ENDPOINT } from "@/app/Constants/endpoints";
import Question from "./Questions";
import SkeletonTopics from "../Loadings/SkeletonTopics";

type TopicsPageProps = {
   topics: TopicResponse;
};

export default function TopicsPage({ topics }: TopicsPageProps) {
   const [isQuestion, setIsQuestion] = useState(false);
   const [questions, setQuestions] = useState<QuestionResponse | null>();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (seniority: string, topic: string) => {
      setLoading(true);
      try {
         const result = await fetch(QUESTION_ENDPOINT, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ seniority: seniority, topic: topic }),
         });

         if (!result.ok) {
            throw new Error("Request failed");
         }

         const data: QuestionResponse = await result.json();
         setLoading(false);
         setQuestions(data);
         console.log(topics);

         setIsQuestion(true);
      } catch (error) {
         console.error(error);
         setLoading(false);
      }
   };

   if (loading) {
      return <SkeletonTopics></SkeletonTopics>;
   }

   return isQuestion === false ? (
      <div className=" px-20 py-10 bg-white/80 rounded-2xl mt-10">
         <h1 className="text-lg text-accent-500 text-bold ">
            {topics.role} - {topics.seniority}
         </h1>

         {topics.topics.map((topic, index) => (
            <div key={index} className="mt-10">
               <div className="flex items-center justify-between mb-2 gap-3">
                  <h2 className="text-2xl font-bold">{topic.name}</h2>
                  <SmallBtn
                     type="button"
                     color="bg-accent-700"
                     onClick={() => handleSubmit(topics.seniority, topic.name)}
                  >
                     Generate Questions
                  </SmallBtn>
               </div>
               <p className="text-gray-600">{topic.description}</p>
            </div>
         ))}
      </div>
   ) : (
      questions && <Question questions={questions}></Question>
   );
}
