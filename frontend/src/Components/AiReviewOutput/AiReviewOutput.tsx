import { ReviewShowing } from "@/types/resumeReviewTypes";

export default function AiReviewOutput({ result }: ReviewShowing) {
 

   return (
      <div className="w-full px-8 py-10  rounded-2xl mt-10">
         <div className="mb-8 pb-8 border-b-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
               <div>
                  <h1 className="text-4xl font-bold text-accent-800 mb-2">
                     Resume Review
                  </h1>
                  <p className="text-gray-300/90 text-lg">{result.summary}</p>
               </div>
               <div className="text-right">
                  <div className={`items-center text-3xl ${
                                    result.ats_score <= 50
                                       ? " text-red-500 "
                                       : result.ats_score <= 85
                                       ? " text-yellow-500 "
                                       : " text-green-500 "
                                 }`}>
                     {result.ats_score}
                  </div>
               </div>
            </div>
         </div>

         <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-accent-800">
               Detailed Criteria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               <div className="p-4 border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-gray-300">
                        {result.criteria.formatting.label}
                     </h3>
                     <span
                        className={`font-bold ${result.criteria.formatting.score>10?"text-green-500":result.criteria.formatting.score>5?"text-yellow-500":"text-red-500"}`}
                     >
                        {result.criteria.formatting.score}/20
                     </span>
                  </div>
                  <p className="text-sm text-gray-300/90">
                     {result.criteria.formatting.feedback}
                  </p>
                  {result.criteria.formatting.issues.length > 0 && (
                     <ul className="text-xs text-gray-300/90 list-disc list-inside mt-2">
                        {result.criteria.formatting.issues.map((issue, i) => (
                           <li key={i}>{issue}</li>
                        ))}
                     </ul>
                  )}
               </div>

               <div className="p-4 border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-gray-300">
                        {result.criteria.contentCompleteness.label}
                     </h3>
                     <span
                        className={`font-bold ${result.criteria.formatting.score>10?"text-green-500":result.criteria.formatting.score>5?"text-yellow-500":"text-red-500"}`}
                     >
                        {result.criteria.contentCompleteness.score}/20
                     </span>
                  </div>
                  <p className="text-sm text-gray-300/90">
                     {result.criteria.contentCompleteness.feedback}
                  </p>
               </div>

               <div className="p-4 border border-gray-300 rounded-lg md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-gray-300">
                        {result.criteria.impactAchievements.label}
                     </h3>
                     <span
                        className={`font-bold ${result.criteria.formatting.score>10?"text-green-500":result.criteria.formatting.score>5?"text-yellow-500":"text-red-500"}`}
                     >
                        {result.criteria.impactAchievements.score}/20
                     </span>
                  </div>
                  <p className="text-sm text-gray-300/90 mb-2">
                     {result.criteria.impactAchievements.feedback}
                  </p>
                  <p className="text-xs text-gray-300/90">
                     Career Stage:{" "}
                     {result.criteria.impactAchievements.careerStage}
                  </p>
               </div>

               <div className="p-4 border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-gray-300">
                        {result.criteria.keywordDensity.label}
                     </h3>
                     <span
                        className={`font-bold ${result.criteria.formatting.score>10?"text-green-500":result.criteria.formatting.score>5?"text-yellow-500":"text-red-500"}`}
                     >
                        {result.criteria.keywordDensity.score}/20
                     </span>
                  </div>
                  <p className="text-sm text-gray-300/90">
                     {result.criteria.keywordDensity.feedback}
                  </p>
               </div>

               <div className="p-4 border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-gray-300">
                        {result.criteria.writingQuality.label}
                     </h3>
                     <span
                        className={`font-bold ${result.criteria.formatting.score>10?"text-green-500":result.criteria.formatting.score>5?"text-yellow-500":"text-red-500"}`}
                     >
                        {result.criteria.writingQuality.score}/20
                     </span>
                  </div>
                  <p className="text-sm text-gray-300/90">
                     {result.criteria.writingQuality.feedback}
                  </p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-500/10 border border-green-500 rounded-lg">
               <h3 className="text-xl font-bold text-green-700 mb-4">
                  Strengths
               </h3>
               <ul className="space-y-2">
                  {result.strengths.map((strength, i) => (
                     <li key={i} className="text-sm text-gray-300/90">
                        ✓ {strength}
                     </li>
                  ))}
               </ul>
            </div>

            <div className="p-6 bg-yellow-500/10 border border-yellow-500 rounded-lg">
               <h3 className="text-xl font-bold text-yellow-700 mb-4">
                  Top Improvements
               </h3>
               <ul className="space-y-2">
                  {result.topImprovements.map((improvement, i) => (
                     <li key={i} className="text-sm text-gray-300/90">
                        → {improvement}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
}
