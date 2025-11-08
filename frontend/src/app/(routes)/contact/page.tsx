import Footer from "@/Components/Footer/Footer";

export default function ContactUs() {
   return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
         <div className=" w-screen bg-black pt-40 px-20">
            <div className=" w-full flex items-center justify-center bg-gradient-to-bl from-black via-accent-300/70 to-black h-[300px] rounded-4xl">
               <h1 className="text-accent-800 text-4xl font-bold">
                  Contact Us
               </h1>
            </div>
            <div className="w-full flex items-center justify-center mb-20">
               <div className="flex flex-col gap-5 mt-10">
                  <h1 className="text-accent-800 text-4xl">Get In Touch</h1>
                  <p className="text-accent-900 max-w-xs">
                     Questions, bugs, or ideas to improve CVBoost? We’d love to
                     hear from you!
                  </p>
                  <div className="flex items-center justify-center gap-3">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.2"
                        stroke="#9c46b9"
                        width="50"
                        height="50"
                     >
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                     </svg>
                     <div className="flex flex-col">
                        <h1 className="text-accent-800 font-bold text-xl">
                           Update
                        </h1>
                        <p className="text-accent-900 max-w-xs">
                           Keep us informed about new feature requests or
                           updates you’d like to see.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.2"
                        stroke="#9c46b9"
                        width="40"
                        height="40"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                        />
                     </svg>
                     <div className="flex flex-col">
                        <h1 className="text-accent-800 font-bold text-xl">
                           Problems
                        </h1>
                        <p className="text-accent-900 max-w-xs">
                           Report any bugs, errors, or issues you encounter
                           while using CVBoost.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#9c46b9"
                        width="40"
                        height="40"
                     >
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                     </svg>
                     <div className="flex flex-col">
                        <h1 className="text-accent-800 font-bold text-xl">
                           Support
                        </h1>
                        <p className="text-accent-900 max-w-xs">
                           Have questions or need assistance? We’re here to help
                           you with CVBoost.
                        </p>
                     </div>
                  </div>
               </div>
               <div></div>
            </div>
            <div className="h-78 bg-white">
               <h1>sdasd</h1>
            </div>
         </div>
         <Footer></Footer>
      </div>
   );
}
