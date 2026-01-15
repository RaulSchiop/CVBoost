import JobApplicationInput from "@/Components/InputsComponents/jobApplicationInput";
import Title from "@/Components/Text/Title";
export default function CreateApplication() {
   return (
      <div className="min-h-full bg-gradient-to-bl from-contrast-500/20 via-contrast-500/60 to-contrast-500/20 p-5 lg:p-20">
         <div className="mb-5">
            <Title title="Create Job application">
               <p>
                  Create a job application to track and manage it in a more
                  organized way.
               </p>
            </Title>
         </div>
         <div>
            <JobApplicationInput></JobApplicationInput>
         </div>
      </div>
   );
}
