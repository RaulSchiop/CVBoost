"use client";
import MainBtn from "@/Components/Buttons/MainBtn";

export default function ForgotPassword() {
   function handleInputChange() {}
   function handleSubbmit() {}
   return (
      <div className="min-h-screen w-full bg-gradient-to-bl from-accent-200 via-black to-accent-200 flex items-center justify-center p-4">
         <div className=" mt-0 md:mt-30 md:mb-20 lg:mt-10 xl:mt-20 lg:mb-0 xl:mb-0 flex items-center justify-center w-full max-w-2xl mx-auto bg-purple-500/25 backdrop-blur-md border border-purple-300/30 px-6 py-8 sm:px-8 sm:py-10 rounded-2xl shadow-lg">
            <form
               onSubmit={() => console.log("logIn")}
               className="flex flex-col gap-4 w-full"
            >
               <div className="flex items-center justify-center flex-col mb-5 gap-3">
                  <h1 className="text-accent-900 text-2xl sm:text-3xl md:text-4xl text-center">
                     Forgot Your Password
                  </h1>
                  <p className="w-full max-w-[500px] text-white text-center text-sm sm:text-base px-2">
                     We will send an email with instructions to reset your
                     password shortly.
                  </p>
               </div>
               <h1 className="text-white text-base sm:text-lg">Email</h1>
               <input
                  placeholder="Enter Your Email"
                  type="email"
                  onChange={handleInputChange}
                  required
                  className="w-full text-white placeholder-white bg-transparent border focus:border-secondary rounded px-4 py-2 focus:outline-none text-sm sm:text-base"
               />
               <div className="mt-2">
                  <MainBtn>Reset Password</MainBtn>
               </div>
            </form>
         </div>
      </div>
   );
}
