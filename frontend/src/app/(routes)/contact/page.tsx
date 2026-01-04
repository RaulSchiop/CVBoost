"use client";
import { useRef, useState } from "react";
import MainBtn from "@/Components/Buttons/MainBtn";
import Footer from "@/Components/Footer/Footer";
import { motion } from "motion/react";

type YourDetails = {
   name: string;
   email: string;
   subject: string;
   question: string;
};

export default function ContactUs() {
   const [newsLetter, setNewsLetter] = useState("");
   const [contactUs, setContactUs] = useState<YourDetails>({
      name: "",
      email: "",
      subject: "",
      question: "",
   });

   //contact us form
   function handleContactUsChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) {
      const { name, value } = e.target;

      setContactUs((prev) => ({
         ...prev,
         [name]: value,
      }));
   }

   async function handleContactUsSubmit() {}

   //newsLetter
   function handleNewsLetterChange(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      setNewsLetter(e.target.value);
   }

   async function handleSubmitNewsLetter() {}

   return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
         <div className=" w-screen bg-black pt-40 px-5 md:px-20  flex flex-col items-center justify-center">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 50 }}
               transition={{ duration: 1.2, type: "spring" }}
               className=" w-full flex items-center justify-center bg-gradient-to-bl from-black via-accent-500/50 to-black h-[350px] rounded-4xl"
            >
               <h1 className="text-accent-800 text-4xl font-bold">
                  Contact Us
               </h1>
            </motion.div>
            <div className="w-full flex items-center justify-center mb-20 mt-20 gap-20 flex-col lg:flex-row">
               <motion.div
                  initial={{ x: -1000 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.5, type: "spring" }}
                  className="flex flex-col gap-10 px-10 md:px-30 rounded-4xl"
               >
                  <h1 className="text-accent-800 text-4xl">Get In Touch</h1>
                  <p className="text-accent-900 max-w-sm">
                     Questions, bugs, or ideas to improve CVBoost? We’d love to
                     hear from you!
                  </p>
                  <div className="flex items-center justify-center gap-10">
                     {/* update icon */}
                     <motion.svg
                        whileHover={{ rotate: 360 }}
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: 360 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 2, type: "spring" }}
                        strokeWidth="1.2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#9c46b9"
                        width="50"
                        height="50"
                     >
                        <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                     </motion.svg>
                     <div className="flex flex-col">
                        <h1 className="text-accent-800 font-bold text-xl">
                           Update
                        </h1>
                        <p className="text-accent-900 max-w-sm">
                           Keep us informed about new feature requests or
                           updates you’d like to see.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-center gap-10 ">
                     {/* tools icon(problems) */}
                     <motion.svg
                        whileHover={{ rotate: 360 }}
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: 360 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 2, type: "spring" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.2"
                        stroke="#9c46b9"
                        width="50"
                        height="50"
                     >
                        <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                     </motion.svg>
                     <div className="flex flex-col">
                        <h1 className="text-accent-800 font-bold text-xl">
                           Problems
                        </h1>
                        <p className="text-accent-900 max-w-sm">
                           Report any bugs, errors, or issues you encounter
                           while using CVBoost.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-center gap-10">

                     {/* phone icon */}
                     <motion.svg
                        whileHover={{ rotate: 360 }}
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: 360 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 2, type: "spring" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.2"
                        stroke="#9c46b9"
                        width="50"
                        height="50"
                     >
                        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                     </motion.svg>
                     <div className="flex flex-col">
                        <h1 className="text-accent-800 font-bold text-xl">
                           Support
                        </h1>
                        <p className="text-accent-900 max-w-sm">
                           Have questions or need assistance? We’re here to help
                           you with CVBoost.
                        </p>
                     </div>
                  </div>
               </motion.div>
               <motion.div
                  initial={{ x: 1000 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.5, type: "spring" }}
                  className="flex items-start  flex-col gap-3 bg-gradient-to-bl from-accent-400 via-black to-accent-200/70 py-10 px-10 md:px-20 rounded-4xl"
               >
                  <h1 className="text-accent-900 font-bold text-2xl ">
                     Your Details
                  </h1>
                  <form className="flex flex-col gap-10">
                     <div className="flex items-center justify-center ">
                        <div className="flex flex-col gap-3">
                           <label className="text-accent-900">Name</label>
                           <input
                              placeholder="Your Name"
                              name="name"
                              value={contactUs.name}
                              onChange={handleContactUsChange}
                              className="text-accent-900 border-b border-accent-500/60 outline-0 py-1 w-[90%]"
                           ></input>
                        </div>
                        <div className="flex flex-col gap-3">
                           <label className="text-accent-900">
                              Email Adress
                           </label>
                           <input
                              placeholder="Your Email"
                              name="email"
                              value={contactUs.email}
                              onChange={handleContactUsChange}
                              className="text-accent-900 border-b border-accent-500/60 outline-0 py-1"
                           ></input>
                        </div>
                     </div>
                     <div className="flex flex-col gap-3">
                        <label className="text-accent-900">Subject</label>
                        <input
                           placeholder="Message Subject"
                           name="subject"
                           value={contactUs.subject}
                           onChange={handleContactUsChange}
                           className="text-accent-900 border-b border-accent-500/60 outline-0 py-1"
                        ></input>
                     </div>
                     <div className="flex flex-col gap-3">
                        <label className="text-accent-900">Questions</label>
                        <textarea
                           placeholder="Your Message"
                           name="question"
                           onChange={handleContactUsChange}
                           value={contactUs.question}
                           className="min-h-[100px] text-accent-900 border-b border-accent-500/60 outline-0 py-1"
                        ></textarea>
                     </div>
                  </form>
                  <MainBtn type="submit">Submit</MainBtn>
               </motion.div>
            </div>
            <motion.form
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1.5, type: "spring" }}
               className=" bg-accent-400 lg:w-[90%] flex items-center justify-between rounded-4xl py-5 md:px-5 lg:px-30 px-5 gap-5 md:gap-0 flex-col md:flex-row mb-20"
            >
               <h1 className="text-white text-4xl max-w-sm">
                  Keep updated of about our app
               </h1>
               <div className="flex items-center justify-between">
                  <input
                     onChange={handleNewsLetterChange}
                     className="bg-white px-5 py-3 rounded-l-xl outline-0"
                     placeholder="Enter Your email"
                     type="email"
                  ></input>
                  <motion.button
                     type="submit"
                     initial={{ opacity: 0, x: -500 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ type: "spring", duration: 0.5 }}
                     whileHover={{
                        scale: 1.1,

                        transition: { type: "spring", duration: 0.4 },
                     }}
                     whileTap={{
                        scale: 0.9,

                        transition: { type: "spring", duration: 0.4 },
                     }}
                     className="text-white flex items-center justify-between px-5 py-3
                  bg-accent-700/50 backdrop-blur-md border border-accent-700/30 rounded-r-xl shadow-lg  active:bg-accent-300"
                  >
                     <h1 className="text-white ">Submit</h1>
                  </motion.button>
               </div>
            </motion.form>
         </div>
         <Footer></Footer>
      </div>
   );
}
