import InterviewAsistentInput from "@/Components/InputsComponents/interviewAsistent";
import Title from "../../../Components/Text/Title";

export default function Learning() {
   return (
      <div className="min-h-screen bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20 p-5 lg:p-20">
         <Title title="Learning helper">
            <p className="w-xl text-center">
               Fill in the details below to generate a tailored learning roadmap
               and 10 interview questions with answers.
            </p>
         </Title>
         
         <InterviewAsistentInput></InterviewAsistentInput>
      </div>
   );
}
