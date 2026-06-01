"use client";

import { useState } from "react";
import {
   CVForm,
   Experience,
   Project,
   Education,
   Certification,
   Skills,
   CVGenerated,
} from "../../../types/createCvRequest";
import MainBtn from "@/Components/Buttons/MainBtn";
import Title from "@/Components/Text/Title";
import Modal from "@/Components/Modal/Modal";
import { useLocalStateStore } from "@/stores/slices/LocalStateStore";
import Skeleton from "@/Components/Loadings/Skeleton";
import CVPreview from "@/Components/Preview/CVPreview";
import { CREATE_RESUME_ENDPOINT } from "@/app/Constants/endpoints";

const defaultSections = {
   summary: true,
   skills: true,
   experience: true,
   projects: true,
   education: true,
   certifications: false,
   languages: false,
};

export default function CVFormComponent() {
   const [sections, setSections] = useState(defaultSections);
   const [showModal, setShowModal] = useState(false);
   const [generatedCV, setGeneratedCV] = useState<CVGenerated | null>(null);
   const [loading, setLoading] = useState(false);
   const { token } = useLocalStateStore();
   const [personal, setPersonal] = useState({
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
      targetRole: "",
      targetCompany: "",
   });

   const [summary, setSummary] = useState("");
   const [skills, setSkills] = useState<Skills>({
      languages: "",
      databases: "",
      frameworks: "",
      tools: "",
      other: "",
   });

   const [experience, setExperience] = useState<Experience[]>([
      {
         company: "",
         role: "",
         startDate: "",
         endDate: "",
         description: "",
      },
   ]);
   const [projects, setProjects] = useState<Project[]>([
      {
         name: "",
         startDate: "",
         endDate: "",
         description: "",
         technologies: "",
      },
   ]);
   const [education, setEducation] = useState<Education[]>([
      {
         university: "",
         degree: "",
         major: "",
         startDate: "",
         endDate: "",
      },
   ]);
   const [certifications, setCertifications] = useState<Certification[]>([]);
   const [languages, setLanguages] = useState<string[]>([]);

   const handlePersonal = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPersonal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSkills((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const updateExperience = (
      index: number,
      field: keyof Experience,
      value: string,
   ) => {
      setExperience((prev) =>
         prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
      );
   };
   const addExperience = () =>
      setExperience((prev) => [
         ...prev,
         {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
         },
      ]);
   const removeExperience = (index: number) =>
      setExperience((prev) => prev.filter((_, i) => i !== index));

   const updateProject = (
      index: number,
      field: keyof Project,
      value: string,
   ) => {
      setProjects((prev) =>
         prev.map((proj, i) =>
            i === index ? { ...proj, [field]: value } : proj,
         ),
      );
   };
   const addProject = () =>
      setProjects((prev) => [
         ...prev,
         {
            name: "",
            startDate: "",
            endDate: "",
            description: "",
            technologies: "",
         },
      ]);
   const removeProject = (index: number) =>
      setProjects((prev) => prev.filter((_, i) => i !== index));

   const updateEducation = (
      index: number,
      field: keyof Education,
      value: string,
   ) => {
      setEducation((prev) =>
         prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)),
      );
   };
   const addEducation = () =>
      setEducation((prev) => [
         ...prev,
         {
            university: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
         },
      ]);
   const removeEducation = (index: number) =>
      setEducation((prev) => prev.filter((_, i) => i !== index));

   const updateCertification = (
      index: number,
      field: keyof Certification,
      value: string,
   ) => {
      setCertifications((prev) =>
         prev.map((cert, i) =>
            i === index ? { ...cert, [field]: value } : cert,
         ),
      );
   };
   const addCertification = () =>
      setCertifications((prev) => [
         ...prev,
         {
            name: "",
            issuer: "",
            date: "",
         },
      ]);
   const removeCertification = (index: number) =>
      setCertifications((prev) => prev.filter((_, i) => i !== index));

   const updateLanguage = (index: number, value: string) => {
      setLanguages((prev) =>
         prev.map((lang, i) => (i === index ? value : lang)),
      );
   };
   const addLanguage = () => setLanguages((prev) => [...prev, ""]);
   const removeLanguage = (index: number) =>
      setLanguages((prev) => prev.filter((_, i) => i !== index));

   const buildForm = (): CVForm => ({
      name: personal.name,
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      linkedin: personal.linkedin || undefined,
      github: personal.github || undefined,
      website: personal.website || undefined,
      targetRole: personal.targetRole,
      targetCompany: personal.targetCompany || undefined,
      summary: sections.summary ? summary : undefined,
      skills: sections.skills ? skills : undefined,
      experience: sections.experience ? experience : undefined,
      projects: sections.projects ? projects : undefined,
      education: sections.education ? education : undefined,
      certifications: sections.certifications ? certifications : undefined,
      languages: sections.languages ? languages : undefined,
   });

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const form = buildForm();
      setLoading(true);

      try {
         const result = await fetch(CREATE_RESUME_ENDPOINT, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
         });
         if (!result.ok) throw new Error(await result.text());
         const data: CVGenerated = await result.json();
         setGeneratedCV(data);
         setShowModal(true);   
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false);
      }
   };
   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
   };

   const inputClass =
      "w-full bg-transparent border border-gray-500/40 rounded px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent-500";
   const labelClass = "text-white/70 text-md mb-1 block";
   const sectionClass =
      "bg-contrast-500/20 border border-gray-500/20 rounded-lg p-5 mb-4 w-[95%]";
   const sectionTitle = "text-white font-bold text-xl mb-4";

   return (
      <div>
         {loading ? (
            <Skeleton></Skeleton>
         ) : (
            <div className="min-h-screen gap-10 bg-gradient-to-bl flex items-center justify-center flex-col from-contrast-500/20 via-contrast-500/60 to-contrast-500/20 p-5 ">
               <Title title="Create new Resume">
                  <div className="flex items-center justify-center flex-col">
                     <p> Create new resume with the help of AI</p>
                     <p className="text-yellow-400/40">
                        Disclaimer AI may give wrong and we recomand to get some
                        time to review the answer{" "}
                     </p>
                  </div>
               </Title>
               <form
                  onSubmit={handleSubmit}
                  className=" mx-auto pb-20 w-[90%]  flex items-center justify-center flex-col"
               >
                  <div className={sectionClass}>
                     <h2 className={sectionTitle}>Personal info</h2>
                     <div className="grid grid-cols-2 gap-3">
                        <div>
                           <label className={labelClass}>Full name *</label>
                           <input
                              className={inputClass}
                              name="name"
                              required
                              onChange={handlePersonal}
                              placeholder="Raul Șchiop"
                           />
                        </div>
                        <div>
                           <label className={labelClass}>Email *</label>
                           <input
                              className={inputClass}
                              name="email"
                              type="email"
                              required
                              onChange={handlePersonal}
                              placeholder="raul@email.com"
                           />
                        </div>
                        <div>
                           <label className={labelClass}>Phone *</label>
                           <input
                              className={inputClass}
                              name="phone"
                              required
                              onChange={handlePersonal}
                              placeholder="+40 728 440 967"
                           />
                        </div>
                        <div>
                           <label className={labelClass}>Location *</label>
                           <input
                              className={inputClass}
                              name="location"
                              required
                              onChange={handlePersonal}
                              placeholder="Timișoara, România"
                           />
                        </div>
                        <div>
                           <label className={labelClass}>LinkedIn</label>
                           <input
                              className={inputClass}
                              name="linkedin"
                              onChange={handlePersonal}
                              placeholder="linkedin.com/in/yourname"
                           />
                        </div>
                        <div>
                           <label className={labelClass}>GitHub</label>
                           <input
                              className={inputClass}
                              name="github"
                              onChange={handlePersonal}
                              placeholder="github.com/yourname"
                           />
                        </div>
                        <div className="col-span-2">
                           <label className={labelClass}>Website</label>
                           <input
                              className={inputClass}
                              name="website"
                              onChange={handlePersonal}
                              placeholder="yoursite.com"
                           />
                        </div>
                     </div>
                  </div>

                  <div className={sectionClass}>
                     <h2 className={sectionTitle}>Target role</h2>
                     <div className="grid grid-cols-2 gap-3">
                        <div>
                           <label className={labelClass}>Target role *</label>
                           <input
                              className={inputClass}
                              name="targetRole"
                              required
                              onChange={handlePersonal}
                              placeholder="Full Stack Developer"
                           />
                        </div>
                        <div>
                           <label className={labelClass}>Target company</label>
                           <input
                              className={inputClass}
                              name="targetCompany"
                              onChange={handlePersonal}
                              placeholder="Google (optional)"
                           />
                        </div>
                     </div>
                  </div>

                  <div className={sectionClass}>
                     <h2 className={sectionTitle}>Sections to include</h2>
                     <div className="flex flex-wrap gap-2">
                        {Object.keys(sections).map((key) => (
                           <button
                              key={key}
                              type="button"
                              onClick={() =>
                                 setSections((prev) => ({
                                    ...prev,
                                    [key]: !prev[key as keyof typeof sections],
                                 }))
                              }
                              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                                 sections[key as keyof typeof sections]
                                    ? "border-accent-500 text-accent-500 bg-accent-500/10"
                                    : "border-gray-500/40 text-white/40"
                              }`}
                           >
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                           </button>
                        ))}
                     </div>
                  </div>

                  {sections.summary && (
                     <div className={sectionClass}>
                        <h2 className={sectionTitle}>Summary</h2>
                        <label className={labelClass}>
                           Brief description (AI will polish this)
                        </label>
                        <textarea
                           className={`${inputClass} min-h-[80px] resize-y`}
                           value={summary}
                           onChange={(e) => setSummary(e.target.value)}
                           placeholder="Final-year Software Engineering student at UPT..."
                        />
                     </div>
                  )}

                  {sections.skills && (
                     <div className={sectionClass}>
                        <h2 className={sectionTitle}>Skills</h2>
                        <div className="grid grid-cols-2 gap-3">
                           {(
                              [
                                 "languages",
                                 "databases",
                                 "frameworks",
                                 "tools",
                                 "other",
                              ] as (keyof Skills)[]
                           ).map((field) => (
                              <div
                                 key={field}
                                 className={
                                    field === "other" ? "col-span-2" : ""
                                 }
                              >
                                 <label className={labelClass}>
                                    {field.charAt(0).toUpperCase() +
                                       field.slice(1)}
                                 </label>
                                 <input
                                    className={inputClass}
                                    name={field}
                                    onChange={handleSkills}
                                    placeholder={
                                       field === "languages"
                                          ? "Java, TypeScript, Python"
                                          : field === "databases"
                                            ? "MongoDB, MySQL"
                                            : field === "frameworks"
                                              ? "Spring Boot, Next.js"
                                              : field === "tools"
                                                ? "Docker, Git, GitHub"
                                                : "Agile, Figma..."
                                    }
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {sections.experience && (
                     <div className={sectionClass}>
                        <h2 className={sectionTitle}>Experience</h2>
                        {experience.map((exp, index) => (
                           <div
                              key={index}
                              className="border border-gray-500/20 rounded-lg p-4 mb-3 bg-black/10"
                           >
                              <div className="flex justify-between items-center mb-3">
                                 <span className="text-white/50 text-xs">
                                    Experience #{index + 1}
                                 </span>
                                 {experience.length > 1 && (
                                    <button
                                       type="button"
                                       onClick={() => removeExperience(index)}
                                       className="text-white/30 hover:text-red-400 text-lg leading-none"
                                    >
                                       ×
                                    </button>
                                 )}
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                 <div>
                                    <label className={labelClass}>
                                       Company
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={exp.company}
                                       onChange={(e) =>
                                          updateExperience(
                                             index,
                                             "company",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Google"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>Role</label>
                                    <input
                                       className={inputClass}
                                       value={exp.role}
                                       onChange={(e) =>
                                          updateExperience(
                                             index,
                                             "role",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Full Stack Developer"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>
                                       Start date
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={exp.startDate}
                                       onChange={(e) =>
                                          updateExperience(
                                             index,
                                             "startDate",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Jan 2024"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>
                                       End date
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={exp.endDate}
                                       onChange={(e) =>
                                          updateExperience(
                                             index,
                                             "endDate",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Present"
                                    />
                                 </div>
                                 <div className="col-span-2">
                                    <label className={labelClass}>
                                       Description (AI will turn this into
                                       bullet points)
                                    </label>
                                    <textarea
                                       className={`${inputClass} min-h-[72px] resize-y`}
                                       value={exp.description}
                                       onChange={(e) =>
                                          updateExperience(
                                             index,
                                             "description",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Worked on full-stack features, led migration of auth system..."
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                        <button
                           type="button"
                           onClick={addExperience}
                           className="text-white/50 hover:text-white text-sm flex items-center gap-1 mt-1"
                        >
                           + Add experience
                        </button>
                     </div>
                  )}

                  {sections.projects && (
                     <div className={sectionClass}>
                        <h2 className={sectionTitle}>Projects</h2>
                        {projects.map((proj, index) => (
                           <div
                              key={index}
                              className="border border-gray-500/20 rounded-lg p-4 mb-3 bg-black/10"
                           >
                              <div className="flex justify-between items-center mb-3">
                                 <span className="text-white/50 text-xs">
                                    Project #{index + 1}
                                 </span>
                                 {projects.length > 1 && (
                                    <button
                                       type="button"
                                       onClick={() => removeProject(index)}
                                       className="text-white/30 hover:text-red-400 text-lg leading-none"
                                    >
                                       ×
                                    </button>
                                 )}
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                 <div>
                                    <label className={labelClass}>
                                       Project name
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={proj.name}
                                       onChange={(e) =>
                                          updateProject(
                                             index,
                                             "name",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Real Estate Web App"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>
                                       Technologies
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={proj.technologies}
                                       onChange={(e) =>
                                          updateProject(
                                             index,
                                             "technologies",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Spring Boot, Next.js, MySQL"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>
                                       Start date
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={proj.startDate}
                                       onChange={(e) =>
                                          updateProject(
                                             index,
                                             "startDate",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Apr 2025"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>
                                       End date
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={proj.endDate}
                                       onChange={(e) =>
                                          updateProject(
                                             index,
                                             "endDate",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="May 2025"
                                    />
                                 </div>
                                 <div className="col-span-2">
                                    <label className={labelClass}>
                                       Description (AI will turn this into
                                       bullet points)
                                    </label>
                                    <textarea
                                       className={`${inputClass} min-h-[72px] resize-y`}
                                       value={proj.description}
                                       onChange={(e) =>
                                          updateProject(
                                             index,
                                             "description",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Built a full-stack real estate app with JWT auth, AI chatbot..."
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                        <button
                           type="button"
                           onClick={addProject}
                           className="text-white/50 hover:text-white text-sm flex items-center gap-1 mt-1"
                        >
                           + Add project
                        </button>
                     </div>
                  )}

                  {sections.education && (
                     <div className={sectionClass}>
                        <h2 className={sectionTitle}>Education</h2>
                        {education.map((edu, index) => (
                           <div
                              key={index}
                              className="border border-gray-500/20 rounded-lg p-4 mb-3 bg-black/10"
                           >
                              <div className="flex justify-between items-center mb-3">
                                 <span className="text-white/50 text-xs">
                                    Education #{index + 1}
                                 </span>
                                 {education.length > 1 && (
                                    <button
                                       type="button"
                                       onClick={() => removeEducation(index)}
                                       className="text-white/30 hover:text-red-400 text-lg leading-none"
                                    >
                                       ×
                                    </button>
                                 )}
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                 <div className="col-span-2">
                                    <label className={labelClass}>
                                       University
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={edu.university}
                                       onChange={(e) =>
                                          updateEducation(
                                             index,
                                             "university",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Politehnica University Timișoara"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>Degree</label>
                                    <input
                                       className={inputClass}
                                       value={edu.degree}
                                       onChange={(e) =>
                                          updateEducation(
                                             index,
                                             "degree",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Bachelor's in Computer Science"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>Major</label>
                                    <input
                                       className={inputClass}
                                       value={edu.major}
                                       onChange={(e) =>
                                          updateEducation(
                                             index,
                                             "major",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Software Engineering"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>
                                       Start date
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={edu.startDate}
                                       onChange={(e) =>
                                          updateEducation(
                                             index,
                                             "startDate",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Oct 2023"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>
                                       End date
                                    </label>
                                    <input
                                       className={inputClass}
                                       value={edu.endDate}
                                       onChange={(e) =>
                                          updateEducation(
                                             index,
                                             "endDate",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Present"
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                        <button
                           type="button"
                           onClick={addEducation}
                           className="text-white/50 hover:text-white text-sm flex items-center gap-1 mt-1"
                        >
                           + Add education
                        </button>
                     </div>
                  )}

                  {sections.certifications && (
                     <div className={sectionClass}>
                        <h2 className={sectionTitle}>Certifications</h2>
                        {certifications.map((cert, index) => (
                           <div
                              key={index}
                              className="border border-gray-500/20 rounded-lg p-4 mb-3 bg-black/10"
                           >
                              <div className="flex justify-between items-center mb-3">
                                 <span className="text-white/50 text-xs">
                                    Certification #{index + 1}
                                 </span>
                                 <button
                                    type="button"
                                    onClick={() => removeCertification(index)}
                                    className="text-white/30 hover:text-red-400 text-lg leading-none"
                                 >
                                    ×
                                 </button>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                 <div>
                                    <label className={labelClass}>Name</label>
                                    <input
                                       className={inputClass}
                                       value={cert.name}
                                       onChange={(e) =>
                                          updateCertification(
                                             index,
                                             "name",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="AWS Solutions Architect"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>Issuer</label>
                                    <input
                                       className={inputClass}
                                       value={cert.issuer}
                                       onChange={(e) =>
                                          updateCertification(
                                             index,
                                             "issuer",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Amazon"
                                    />
                                 </div>
                                 <div>
                                    <label className={labelClass}>Date</label>
                                    <input
                                       className={inputClass}
                                       value={cert.date}
                                       onChange={(e) =>
                                          updateCertification(
                                             index,
                                             "date",
                                             e.target.value,
                                          )
                                       }
                                       placeholder="Mar 2025"
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                        <button
                           type="button"
                           onClick={addCertification}
                           className="text-white/50 hover:text-white text-sm flex items-center gap-1 mt-1"
                        >
                           + Add certification
                        </button>
                     </div>
                  )}

                  {sections.languages && (
                     <div className={sectionClass}>
                        <h2 className={sectionTitle}>Languages</h2>
                        {languages.map((lang, index) => (
                           <div key={index} className="flex gap-2 mb-2">
                              <input
                                 className={inputClass}
                                 value={lang}
                                 onChange={(e) =>
                                    updateLanguage(index, e.target.value)
                                 }
                                 placeholder="English - C1"
                              />
                              <button
                                 type="button"
                                 onClick={() => removeLanguage(index)}
                                 className="text-white/30 hover:text-red-400 text-lg px-2"
                              >
                                 ×
                              </button>
                           </div>
                        ))}
                        <button
                           type="button"
                           onClick={addLanguage}
                           className="text-white/50 hover:text-white text-sm flex items-center gap-1 mt-1"
                        >
                           + Add language
                        </button>
                     </div>
                  )}

                  <MainBtn className="w-[90%]">
                     <p className="w-full text-center text-xl">
                        {" "}
                        Generate CV with AI
                     </p>
                  </MainBtn>
               </form>

               <Modal show={showModal} onClose={() => setShowModal(false)}>
                  {generatedCV && (
                     <CVPreview
                        cv={generatedCV}
                        onCancel={() => setShowModal(false)}
                        onSave={handleSave}
                     />
                  )}
               </Modal>
            </div>
         )}
      </div>
   );
}
