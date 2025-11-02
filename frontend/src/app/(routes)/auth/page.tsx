"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MainBtn from "@/Components/Buttons/MainBtn";
import Alert from "@/Components/Alert/Alert";

type AlertType = {
   message: string;
   on: boolean;
};

type LogIn = {
   email: string;
   password: string;
};
type Register = {
   name: string;
   email: string;
   password: string;
};
export default function LogIn() {
   const [change, setChange] = useState(true);
   const [error, setError] = useState<AlertType>({
      message: "",
      on: false,
   });
   const [logIn, setLogIn] = useState<LogIn>({
      email: "",
      password: "",
   });
   const [register, setRegister] = useState<Register>({
      name: "",
      email: "",
      password: "",
   });

   function handleChange() {
      setChange(!change);
   }

   function handleCloseAlert() {
      setError({ message: "", on: false });
   }

   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;

      setLogIn((prev) => ({
         ...prev,
         [name]: value,
      }));
   }

   return (
      <div className="sm:mt-10 md:mt-0 bg-gradient-to-bl from-accent-200 via-black to-accent-200 ">
         {error.on && (
            <Alert message={error.message} onClose={handleCloseAlert}></Alert>
         )}
         <AnimatePresence mode="wait">
            {change === true ? (
               <motion.div
                  className="flex h-screen w-full items-center justify-center lg:gap-36 flex-wrap sm:gap-10 "
                  key="logInView"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <motion.div
                     key="LogIn"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: -500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     <form
                        onSubmit={() => console.log("logIn")}
                        className="flex flex-col gap-2"
                     >
                        <h1 className="text-white text-3xl">Log in</h1>
                        <input
                           placeholder="Email"
                           name="email"
                           type="email"
                           onChange={handleInputChange}
                           value={logIn.email}
                           required
                           className="text-white placeholder-white border focus:border-secondarytext rounded px-4 py-2 focus:outline-none"
                        />
                        <input
                           placeholder="Password"
                           name="password"
                           type="password"
                           onChange={handleInputChange}
                           value={logIn.password}
                           required
                           className="text-white placeholder-white border focus:border-secondarytext rounded px-4 py-2 focus:outline-none"
                        />
                        <Link
                           className="transition-all duration-300 text-accent-900 hover:underline hover:px-3 active:sclae-90 transform hover:bg-gradient-to-r from-accent-300 via-accent-200 to-black hover:rounded-lg"
                           href={"/auth/forgotPassword"}
                        >
                           Forgot Password ?
                        </Link>
                        <MainBtn>Log in</MainBtn>
                     </form>
                  </motion.div>

                  <motion.div
                     key="signIn"
                     initial={{ y: -500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                     className="flex flex-col gap-3"
                  >
                     <h1 className=" text-white text-3xl">Create Account</h1>
                     <p className="  text-white">
                        Register with your details to use our site
                     </p>
                     <MainBtn onClick={handleChange}>
                        Create new account
                     </MainBtn>
                  </motion.div>
               </motion.div>
            ) : (
               <motion.div
                  key="registerView"
                  className="flex h-screen w-full items-center justify-center lg:gap-36 flex-wrap sm:gap-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <motion.div
                     key="Register"
                     initial={{ y: -500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     <form
                        className="flex flex-col gap-3"
                        onSubmit={() => console.log("register")}
                     >
                        <h1 className="text-white text-3xl">Register</h1>
                        <input
                           placeholder="Name"
                           name="name"
                           type="text"
                           onChange={handleInputChange}
                           value={register.name}
                           required
                           className="text-white  placeholder-white border focus:border-secondarytext rounded px-4 py-2 focus:outline-none"
                        />
                        <input
                           placeholder="Email"
                           name="email"
                           type="email"
                           onChange={handleInputChange}
                           value={register.email}
                           required
                           className="text-white  placeholder-white border focus:border-secondarytext rounded px-4 py-2 focus:outline-none"
                        />
                        <input
                           placeholder="Password"
                           name="password"
                           type="password"
                           onChange={handleInputChange}
                           value={register.password}
                           required
                           className="text-white placeholder-white border focus:border-secondarytext rounded px-4 py-2 focus:outline-none"
                        />
                        <MainBtn>Register</MainBtn>
                     </form>
                  </motion.div>

                  <motion.div
                     className="flex flex-col gap-3"
                     key="signInAlt"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: -500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     <h1 className="text-white text-3xl">Log In</h1>
                     <p className="text-white">Log in if you have an account</p>
                     <MainBtn onClick={handleChange}>Log In</MainBtn>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
