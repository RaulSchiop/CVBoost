import React from "react";

interface SkeletonProps {
   className?: string;
}

export default function SkeletonTopics() {
   return (
      <div className="w-[80%] mt-10">
         <div className="animate-pulse px-8 py-10 bg-white/80 rounded-2xl">
            <div className="h-6 bg-gray-300 rounded mb-10 w-40"></div>
            {Array.from({ length: 4 }).map((_, index) => (
               <div key={index} className="mt-10">
                  <div className="flex items-center justify-between mb-2">
                     <div className="h-8 bg-gray-600 rounded w-1/2"></div>
                     <div className="h-8 bg-gray-600  rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-600  rounded w-3/4"></div>
               </div>
            ))}
         </div>
      </div>
   );
}
