import { JSX } from "react";
import MainCard from "./MainCard";

export default function ToolsSection() {
   return (
      <div className="grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-5 lg:grid-rows-2 py-5 md:px-15 lg:px-15 px-15 gap-5">
         <div className=" lg:col-span-2 ">
            <MainCard ClassName="h-full">
               <div className="flex flex-col items-center justify-center gap-4 px-7 py-8">
                  <div className="bg-gradient-to-tl from-purple-500/40 via-purple-500/85 to-purple-500/20 p-5 rounded-2xl">
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
                  </div>
                  <h1 className="text-white text-2xl">Resumes Creation</h1>
                  <p className="text-white/70 text-center text-lg">
                     Easily create professional resumes with{" "}
                     <a className="text-white font-bold">ATS Templates</a>,
                     highlighting your skills and experience to impress
                     recruiters.
                  </p>
               </div>
            </MainCard>
         </div>

         <div className="lg:col-span-2">
            <MainCard ClassName="h-full">
               <div className="flex flex-col items-center justify-center gap-4 px-7 py-8">
                  <div className="bg-gradient-to-tl from-purple-500/40 via-purple-500/85 to-purple-500/20 p-5 rounded-2xl">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                     </svg>
                  </div>
                  <h1 className="text-white text-2xl">
                     Cover Letters Creation
                  </h1>
                  <p className="text-white/70 text-center text-lg">
                     Generate {""}
                     <a className="text-white font-bold">
                        professional cover letters{" "}
                     </a>{" "}
                     that match your resume and the job, helping you stand out.
                  </p>
               </div>
            </MainCard>
         </div>

         <div className="col-span-1">
            <MainCard ClassName="h-full">
               <div className="flex flex-col items-center justify-center gap-4 px-5 py-8">
                  <div className="bg-gradient-to-tl from-purple-500/40 via-purple-500/85 to-purple-500/20 p-5 rounded-2xl">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        />
                     </svg>
                  </div>

                  <h1 className="text-white text-2xl text-center">
                     Store Resumes
                  </h1>
                  <p className="text-white/70 text-center text-lg">
                     Keep your resumes organized and easy to access for updates.
                  </p>
               </div>
            </MainCard>
         </div>

         <div className="lg:col-span-2">
            <MainCard ClassName="h-full">
               <div className="flex flex-col items-center justify-center gap-4 px-7 py-8">
                  <div className="bg-gradient-to-tl from-purple-500/40 via-purple-500/85 to-purple-500/20 p-5 rounded-2xl">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                        />
                     </svg>
                  </div>
                  <h1 className="text-white text-2xl">Job Match</h1>
                  <p className="text-white/70 text-center text-lg">
                     Upload a resume and job description to get a detailed{" "}
                     <a className="text-white font-bold">AI match score </a>,
                     actionable tips, and suggestions to make your application
                     stronger and more targeted.
                  </p>
               </div>
            </MainCard>
         </div>

         <div className="lg:col-span-1">
            <MainCard ClassName="h-full">
               <div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
                  <div className="bg-gradient-to-tl from-purple-500/40 via-purple-500/85 to-purple-500/20 p-5 rounded-2xl">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        />
                     </svg>
                  </div>
                  <h1 className="text-white text-2xl text-center">
                     Store Cover Letters
                  </h1>
                  <p className="text-white/70 text-center">
                     Store your cover letters in one place and quickly reuse
                     them for new applications.
                  </p>
               </div>
            </MainCard>
         </div>

         <div className="lg:col-span-2">
            <MainCard ClassName="h-full">
               <div className="flex flex-col items-center justify-center gap-4 px-7 py-8">
                  <div className="bg-gradient-to-tl from-purple-500/40 via-purple-500/85 to-purple-500/20 p-5 rounded-2xl">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                     </svg>
                  </div>
                  <h1 className="text-white text-2xl">AI Review</h1>
                  <p className="text-white/70 text-center text-lg">
                     Upload your resume to get detailed{" "}
                     <a className="text-white font-bold">AI feedback </a> on
                     structure, clarity, and impact. Receive suggestions to
                     enhance readability, highlight strengths, and increase your
                     chances of getting noticed.
                  </p>
               </div>
            </MainCard>
         </div>
      </div>
   );
}
