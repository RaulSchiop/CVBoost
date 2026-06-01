"use client";

import { CVGenerated } from "../../types/createCvRequest";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CVPreview({
   cv,
   onSave,
   onCancel,
}: {
   cv: CVGenerated;
   onSave: (e?: React.FormEvent) => void;
   onCancel: () => void;
}) {
   const downloadPDF = async () => {
      const element = document.getElementById("cv-preview");
      if (!element) return;

      const canvas = await html2canvas(element, {
         scale: 2,
         backgroundColor: "#ffffff",
         useCORS: true,
         allowTaint: true,
         logging: false,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(
         canvas.toDataURL("image/png"),
         "PNG",
         0,
         0,
         imgWidth,
         imgHeight,
      );

      pdf.save(`${cv.name}_CV.pdf`);
   };

   return (
      <div className="flex flex-col items-center gap-4 w-full">
         <div
            id="cv-preview"
            style={{
               width: "794px",
               padding: "48px 56px",
               fontSize: "13px",
               lineHeight: "1.5",
               backgroundColor: "#ffffff",
               color: "#000000",
               fontFamily: "sans-serif",
            }}
         >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
               <h1
                  style={{
                     fontSize: "28px",
                     fontWeight: "700",
                     letterSpacing: "2px",
                     textTransform: "uppercase",
                     marginBottom: "6px",
                  }}
               >
                  {cv.name}
               </h1>
               <p style={{ fontSize: "12px", color: "#333" }}>
                  {[cv.email, cv.phone, cv.linkedin, cv.github, cv.website]
                     .filter(Boolean)
                     .join(" | ")}
               </p>
               <p style={{ fontSize: "12px", color: "#333" }}>{cv.location}</p>
            </div>

            {cv.summary && (
               <CVSection title="SUMMARY">
                  <p style={{ color: "#222" }}>{cv.summary}</p>
               </CVSection>
            )}

            {cv.skills && (
               <CVSection title="SKILLS">
                  <div
                     style={{
                        paddingLeft: "5px",
                        marginTop: "4px",
                     }}
                  >
                     {cv.skills.languages && cv.skills.languages.length > 0 && (
                        <div
                           style={{
                              marginBottom: "5px",
                              display: "flex",
                              gap: "8px",
                           }}
                        >
                           <span style={{ color: "#000000" }}>•</span>
                           <div>
                              <span style={{ fontWeight: "600" }}>
                                 Languages:
                              </span>{" "}
                              {cv.skills.languages.join(", ")}
                           </div>
                        </div>
                     )}
                     {cv.skills.databases && cv.skills.databases.length > 0 && (
                        <div
                           style={{
                              marginBottom: "5px",
                              display: "flex",
                              gap: "8px",
                           }}
                        >
                           <span style={{ color: "#000000" }}>•</span>
                           <div>
                              <span style={{ fontWeight: "600" }}>
                                 Databases:
                              </span>{" "}
                              {cv.skills.databases.join(", ")}
                           </div>
                        </div>
                     )}
                     {cv.skills.frameworks &&
                        cv.skills.frameworks.length > 0 && (
                           <div
                              style={{
                                 marginBottom: "5px",
                                 display: "flex",
                                 gap: "8px",
                              }}
                           >
                              <span style={{ color: "#000000" }}>•</span>
                              <div>
                                 <span style={{ fontWeight: "600" }}>
                                    Technologies/Frameworks:
                                 </span>{" "}
                                 {cv.skills.frameworks.join(", ")}
                              </div>
                           </div>
                        )}
                     {cv.skills.tools && cv.skills.tools.length > 0 && (
                        <div
                           style={{
                              marginBottom: "5px",
                              display: "flex",
                              gap: "8px",
                           }}
                        >
                           <span style={{ color: "#000000" }}>•</span>
                           <div>
                              <span style={{ fontWeight: "600" }}>
                                 DevOps & Tools:
                              </span>{" "}
                              {cv.skills.tools.join(", ")}
                           </div>
                        </div>
                     )}
                     {cv.skills.other && cv.skills.other.length > 0 && (
                        <div
                           style={{
                              marginBottom: "5px",
                              display: "flex",
                              gap: "8px",
                           }}
                        >
                           <span style={{ color: "#000000" }}>•</span>
                           <div>
                              <span style={{ fontWeight: "600" }}>Other:</span>{" "}
                              {cv.skills.other.join(", ")}
                           </div>
                        </div>
                     )}
                  </div>
               </CVSection>
            )}

            {cv.experience && cv.experience.length > 0 && (
               <CVSection title="EXPERIENCE">
                  {cv.experience.map((exp, i) => (
                     <div key={i} style={{ marginBottom: "14px" }}>
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              marginBottom: "4px",
                           }}
                        >
                           <strong style={{ fontSize: "13px" }}>
                              {exp.company} — {exp.role}
                           </strong>
                           <span style={{ fontSize: "12px", color: "#555" }}>
                              {exp.startDate} – {exp.endDate}
                           </span>
                        </div>
                        <div style={{ paddingLeft: "5px" }}>
                           {exp.bullets.map((b, j) => (
                              <div
                                 key={j}
                                 style={{
                                    marginBottom: "4px",
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "flex-start",
                                 }}
                              >
                                 <span
                                    style={{
                                       color: "#000000",
                                       lineHeight: "1.5",
                                    }}
                                 >
                                    •
                                 </span>
                                 <span style={{ flex: 1 }}>{b}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </CVSection>
            )}

            {cv.projects && cv.projects.length > 0 && (
               <CVSection title="PROJECTS">
                  {cv.projects.map((proj, i) => (
                     <div key={i} style={{ marginBottom: "14px" }}>
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              marginBottom: "4px",
                           }}
                        >
                           <strong style={{ fontSize: "13px" }}>
                              {proj.name}
                           </strong>
                           <span style={{ fontSize: "12px", color: "#555" }}>
                              {proj.startDate} – {proj.endDate}
                           </span>
                        </div>
                        <div style={{ paddingLeft: "5px" }}>
                           {proj.bullets.map((b, j) => (
                              <div
                                 key={j}
                                 style={{
                                    marginBottom: "4px",
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "flex-start",
                                 }}
                              >
                                 <span
                                    style={{
                                       color: "#000000",
                                       lineHeight: "1.5",
                                    }}
                                 >
                                    •
                                 </span>
                                 <span style={{ flex: 1 }}>{b}</span>
                              </div>
                           ))}
                           {proj.technologies &&
                              proj.technologies.length > 0 && (
                                 <div
                                    style={{
                                       marginBottom: "4px",
                                       display: "flex",
                                       gap: "8px",
                                       alignItems: "flex-start",
                                    }}
                                 >
                                    <span
                                       style={{
                                          color: "#000000",
                                          lineHeight: "1.5",
                                       }}
                                    >
                                       •
                                    </span>
                                    <span style={{ flex: 1 }}>
                                       <span style={{ fontWeight: "600" }}>
                                          Technologies:
                                       </span>{" "}
                                       {proj.technologies.join(", ")}
                                    </span>
                                 </div>
                              )}
                        </div>
                     </div>
                  ))}
               </CVSection>
            )}

            {/* Education */}
            {cv.education && cv.education.length > 0 && (
               <CVSection title="EDUCATION">
                  {cv.education.map((edu, i) => (
                     <div key={i} style={{ marginBottom: "10px" }}>
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                           }}
                        >
                           <strong>{edu.university}</strong>
                           <span style={{ fontSize: "12px", color: "#555" }}>
                              {edu.startDate} – {edu.endDate}
                           </span>
                        </div>
                        <p>
                           {edu.degree}
                           {edu.major ? ` — ${edu.major}` : ""}
                        </p>
                     </div>
                  ))}
               </CVSection>
            )}

            {cv.certifications && cv.certifications.length > 0 && (
               <CVSection title="CERTIFICATIONS">
                  {cv.certifications.map((cert, i) => (
                     <div
                        key={i}
                        style={{
                           display: "flex",
                           justifyContent: "space-between",
                        }}
                     >
                        <span>
                           {cert.name} — {cert.issuer}
                        </span>
                        <span style={{ fontSize: "12px", color: "#555" }}>
                           {cert.date}
                        </span>
                     </div>
                  ))}
               </CVSection>
            )}

            {/* Languages */}
            {cv.languages && cv.languages.length > 0 && (
               <CVSection title="LANGUAGES">
                  <p>{cv.languages.join(", ")}</p>
               </CVSection>
            )}
         </div>

         {/* Action buttons outside the CV */}
         <div className="flex gap-4 w-full justify-end mt-2">
            <button
               onClick={downloadPDF}
               className="px-6 py-2 border border-white/20 text-white/70 rounded hover:bg-white/10 transition-all"
            >
               Download PDF
            </button>
            <button
               onClick={onCancel}
               className="px-6 py-2 border border-gray-500/40 text-white/70 rounded hover:bg-white/10 transition-all"
            >
               Cancel
            </button>
            <button
               onClick={onSave}
               className="px-6 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all"
            >
               Save CV
            </button>
         </div>
      </div>
   );
}

function CVSection({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode;
}) {
   return (
      <div style={{ marginBottom: "18px" }}>
         <h2
            style={{
               fontSize: "12px",
               fontWeight: "700",
               letterSpacing: "1.5px",
               textTransform: "uppercase",
               borderBottom: "1px solid #000",
               paddingBottom: "6px",
               marginBottom: "10px",
            }}
         >
            {title}
         </h2>
         {children}
      </div>
   );
}
