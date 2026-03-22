"use client";

import { QuestionResponse } from "@/types/inteviewAsistentTypes";
import { useState } from "react";
import MainBtn from "../Buttons/MainBtn";

type QuestionsPageProps = {
   questions: QuestionResponse;
};

export default function Questions({ questions }: QuestionsPageProps) {
   const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
   const [showFeedback, setShowFeedback] = useState(false);
   const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
      null,
   );
   const [end, setEnd] = useState(false);

   const currentQuestion = questions.questions[currentIndex];
   const isLastQuestion = currentIndex === questions.questions.length - 1;

   const handleAnswerSelect = (optionIndex: number) => {
      setSelectedAnswer(optionIndex);
   };

   const handleSubmitAnswer = () => {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setAnsweredCorrectly(isCorrect);
      if (isCorrect) {
         setCorrectAnswerCount(correctAnswerCount + 1);
      }
      setShowFeedback(true);
   };

   const handleNextQuestion = () => {
      if (isLastQuestion) {
         setEnd(true);
         setCurrentIndex(0);
         setSelectedAnswer(null);
         setShowFeedback(false);
         setAnsweredCorrectly(null);
      } else {
         setCurrentIndex(currentIndex + 1);
         setSelectedAnswer(null);
         setShowFeedback(false);
         setAnsweredCorrectly(null);
      }
   };

   return (
      <div className="px-20 py-10 bg-white/80 rounded-2xl mt-10">
         {end === true ? (
            <div className="text-center py-16 flex flex-col justify-center items-cente">
               <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                     Quiz Complete! 🎉
                  </h1>
                  <p className="text-gray-600 text-lg mb-8">
                     Here's your performance summary:
                  </p>
               </div>

               <div className="bg-green-500/10 border border-green-500 rounded-xl p-6 mb-5">
                  <p className="text-3xl font-bold text-green-600 mb-2">
                     {correctAnswerCount} / 10
                  </p>
               </div>

               <div className="flex gap-4 justify-center">
                  <MainBtn
                     type="button"
                     onClick={() => {
                        setEnd(false);
                        setCorrectAnswerCount(0);
                        setCurrentIndex(0);
                        setSelectedAnswer(null);
                        setShowFeedback(false);
                        setAnsweredCorrectly(null);
                     }}
                  >
                     Restart Quiz
                  </MainBtn>
               </div>
            </div>
         ) : (
            <div>
               <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                     <h1 className="text-lg text-accent-500 font-bold">
                        Question {currentIndex + 1} of{" "}
                        {questions.questions.length}
                     </h1>
                     <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                           className="h-full bg-accent-500 transition-all duration-300"
                           style={{
                              width: `${((currentIndex + 1) / questions.questions.length) * 100}%`,
                           }}
                        ></div>
                     </div>
                  </div>
               </div>

               <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-6">
                     {currentQuestion.question}
                  </h2>

                  <div className="space-y-3 mb-6">
                     {currentQuestion.options.map((option, index) => (
                        <div key={index}>
                           <button
                              onClick={() =>
                                 !showFeedback && handleAnswerSelect(index)
                              }
                              disabled={showFeedback}
                              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                                 selectedAnswer === index
                                    ? "border-accent-500 bg-accent-500/10"
                                    : "border-gray-300 hover:border-accent-500"
                              } ${
                                 showFeedback &&
                                 index === currentQuestion.correctAnswer
                                    ? "border-green-500 bg-green-500/10"
                                    : ""
                              } ${
                                 showFeedback &&
                                 selectedAnswer === index &&
                                 index !== currentQuestion.correctAnswer
                                    ? "border-red-500 bg-red-500/10"
                                    : ""
                              } disabled:cursor-not-allowed`}
                           >
                              <div className="flex items-center">
                                 <div
                                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                       selectedAnswer === index
                                          ? "border-accent-500 bg-accent-500"
                                          : "border-gray-400"
                                    }`}
                                 >
                                    {selectedAnswer === index && (
                                       <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                 </div>
                                 <span>{option}</span>
                              </div>
                           </button>
                        </div>
                     ))}
                  </div>

                  {showFeedback && (
                     <div
                        className={`p-4 rounded-lg mb-6 ${
                           answeredCorrectly
                              ? "bg-green-500/10 border border-green-500 text-green-700"
                              : "bg-red-500/10 border border-red-500 text-red-700"
                        }`}
                     >
                        <p className="font-semibold mb-2">
                           {answeredCorrectly ? "✓ Correct!" : "✗ Incorrect"}
                        </p>
                        <p className="text-sm">{currentQuestion.explanation}</p>
                     </div>
                  )}

                  <div className="flex gap-4 justify-between">
                     {!showFeedback ? (
                        <MainBtn
                           type="button"
                           onClick={handleSubmitAnswer}
                           className={`!opacity-100 ${selectedAnswer === null ? "opacity-50" : ""}`}
                        >
                           Submit Answer
                        </MainBtn>
                     ) : (
                        <MainBtn type="button" onClick={handleNextQuestion}>
                           Next Question
                        </MainBtn>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
