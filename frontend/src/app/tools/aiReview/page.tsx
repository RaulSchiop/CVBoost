import MainBtn from "@/Components/Buttons/MainBtn";

export default function AiReview() {
   return (
      <div className="min-h-screen bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20 p-20">
         <div className="flex flex-col items-center w-full mb-10">
            <div className="bg-gradient-to-br from-pink-500 via-contrast-500/90 to-contrast-500/80 p-2 rounded-xl border border-accent-500">
               {/* AI resume icon */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" text-white w-10 h-10 "
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
               </svg>
            </div>
            <div className="flex items-center flex-col justify-center mt-4 gap-2">
               {/* page text */}
               <h1 className="text-white text-5xl font-bold">
                  Ai Resume Review
               </h1>
               <p className="text-white/50">
                  Get AI-powered ATS Review score based across 5 key criteria
               </p>
            </div>
         </div>
         <div className="flex bg-contrast-500/40 p-2 w-fit rounded-2xl gap-2">
            <MainBtn>
               {/* uload icon */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
               </svg>
               <p>Upload New</p>
            </MainBtn>
            <MainBtn>
               {/* document writen */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
               </svg>
               <p>Review Existing</p>
            </MainBtn>
         </div>
         <div className="bg-contrast-500/20 rounded-2xl mt-5 h-[400px] backdrop-blur-md ">
            <div className="p-10 w-full h-full">
               <div className="rounded-2xl border-2 border-dashed   border-gray-500/80 w-full h-full p-5 flex items-center justify-center">
                  <div className=" p-2 rounded-xl bg-gradient-to-br from-contrast-500/40 via-contrast-500/20 to-contrast-500/10 border border-gray-500/60">
                     {/* document writen */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-14 text-white/50"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                     </svg>
                  </div>
                  <div>
                     <h1 className="text-2xl text-white/80">
                        Upload Resume PDF
                     </h1>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
