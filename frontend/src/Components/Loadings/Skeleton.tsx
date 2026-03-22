import React from "react";

interface SkeletonProps {
   lines?: number;
   className?: string;
}

export default function Skeleton({ lines = 5, className = "" }: SkeletonProps) {
   return (
      <div className={`animate-pulse space-y-4 ${className}`}>
         {Array.from({ length: lines }).map((_, index) => {
            const isLastLine = index === lines - 1;
            const width = isLastLine ? "w-3/4" : "w-full";

            return (
               <div
                  key={index}
                  className={`h-4 bg-gray-300 rounded ${width}`}
               ></div>
            );
         })}
      </div>
   );
}
