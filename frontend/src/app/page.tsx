import HeroPageBtn from "@/Components/Buttons/HeroPageBtn";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import Logo from "@/Components/Logo/Logo";
import Title from "@/Components/Text/Title";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
         <div className="flex flex-col items-center pt-30 gap-6 p-10 min-h-screen ">
            <Header></Header>
            <div className="flex items-center justify-center flex-col gap-5 bg-gradient-to-bl from-black via-accent-500/50 to-black w-full h-[500px] rounded-3xl">
               <Title title="Boost Your CV with AI">
                  <p className="text-xl mt-2 font-bold w-2xl text-center bg-gradient-to-r from-accent-900 via-accent-700 to-accent-900 bg-clip-text text-transparent">
                     Create job-winning CVs and personalized cover letters in
                     minutes using powerful AI built for today’s job market.
                  </p>
               </Title>
               <HeroPageBtn>Get Started For Free</HeroPageBtn>
            </div>
         </div>
         <Footer></Footer>
      </div>
   );
}
