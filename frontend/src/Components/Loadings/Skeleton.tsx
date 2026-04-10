import React from "react";

interface SkeletonProps {
   className?: string;
}

export default function Skeleton() {
   return (
      <div className="w-[100%]">
         <div className="animate-pulse px-8 py-10 rounded-2xl">
            <div className="h-6 rounded mb-10 w-40"></div>
            {Array.from({ length: 4 }).map((_, index) => (
               <div key={index} className="mt-10">
                  <div className={`h-4 bg-gray-600 rounded w-2/5 mb-2`}></div>
                  <div className="h-4 bg-gray-600 rounded w-4/5 mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-600  rounded w-3/4"></div>
               </div>
            ))}
         </div>
      </div>
   );
}
