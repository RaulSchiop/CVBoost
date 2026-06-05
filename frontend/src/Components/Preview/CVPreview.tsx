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
   onSave: () => void;
   onCancel: () => void;
}) {
   const downloadPDF = () => {
      const pdf = new jsPDF({
         orientation: "p",
         unit: "mm",
         format: "a4",
         compress: true,
      });

      let y = 20;
      const leftMargin = 20;
      const rightMargin = 190;
      const contentWidth = 170;

      const checkPageBound = (neededSpace: number) => {
         if (y + neededSpace > 280) {
            pdf.addPage();
            y = 20;
         }
      };

      const addBodyParagraph = (
         text: string,
         size = 10,
         isBold = false,
         lineSpacing = 5,
      ) => {
         pdf.setFontSize(size);
         pdf.setFont("helvetica", isBold ? "bold" : "normal");

         const splitLines = pdf.splitTextToSize(text, contentWidth);
         splitLines.forEach((line: string) => {
            checkPageBound(lineSpacing);
            pdf.text(line, leftMargin, y);
            y += lineSpacing;
         });
      };

      const addSectionHeader = (title: string) => {
         checkPageBound(15);
         y += 4;
         pdf.setFontSize(11);
         pdf.setFont("helvetica", "bold");
         pdf.text(title.toUpperCase(), leftMargin, y);

         y += 2;
         pdf.setLineWidth(0.2);
         pdf.line(leftMargin, y, rightMargin, y);
         y += 6;
      };

      const addBulletRow = (label: string, value: string, labelBold = true) => {
         checkPageBound(6);
         pdf.setFontSize(10);

         pdf.setFont("helvetica", "normal");
         pdf.text("•", leftMargin + 2, y);

         pdf.setFont("helvetica", labelBold ? "bold" : "normal");
         pdf.text(label, leftMargin + 7, y);

         const labelWidth = label ? pdf.getTextWidth(label) + 2 : 0;

         pdf.setFont("helvetica", "normal");
         const availableWidth = contentWidth - 7 - labelWidth;
         const splitValues = pdf.splitTextToSize(value, availableWidth);

         splitValues.forEach((line: string, index: number) => {
            if (index > 0) checkPageBound(5);
            const currentX =
               index === 0
                  ? leftMargin + 7 + labelWidth
                  : leftMargin + 7 + labelWidth;
            pdf.text(line, currentX, y);
            if (index < splitValues.length - 1) y += 5;
         });
         y += 5.5;
      };

      pdf.setFontSize(26);
      pdf.setFont("helvetica", "bold");
      pdf.text(cv.name.toUpperCase(), 105, y, { align: "center" });
      y += 7;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const contactInfo = [
         cv.email,
         cv.phone,
         cv.linkedin,
         cv.github,
         cv.website,
      ]
         .filter(Boolean)
         .join(" | ");
      pdf.text(contactInfo, 105, y, { align: "center" });
      y += 5;
      pdf.text(cv.location, 105, y, { align: "center" });
      y += 10;

      if (cv.summary) {
         addSectionHeader("Summary");
         addBodyParagraph(cv.summary, 10, false, 5);
         y += 2;
      }

      if (cv.skills) {
         addSectionHeader("Skills");
         if (cv.skills.languages?.length)
            addBulletRow("Languages: ", cv.skills.languages.join(", "));
         if (cv.skills.databases?.length)
            addBulletRow("Databases: ", cv.skills.databases.join(", "));
         if (cv.skills.frameworks?.length)
            addBulletRow(
               "Technologies/Frameworks: ",
               cv.skills.frameworks.join(", "),
            );
         if (cv.skills.tools?.length)
            addBulletRow("DevOps & Tools: ", cv.skills.tools.join(", "));
         if (cv.skills.other?.length)
            addBulletRow("Other: ", cv.skills.other.join(", "));
      }

      if (cv.experience && cv.experience.length > 0) {
         addSectionHeader("Experience");
         cv.experience.forEach((exp) => {
            checkPageBound(12);
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text(`${exp.company} — ${exp.role}`, leftMargin, y);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(`${exp.startDate} – ${exp.endDate}`, rightMargin, y, {
               align: "right",
            });
            y += 6;

            exp.bullets?.forEach((bulletText) => {
               addBulletRow("", bulletText, false);
            });
            y += 1.5;
         });
      }

      if (cv.projects && cv.projects.length > 0) {
         addSectionHeader("Projects");
         cv.projects.forEach((proj) => {
            checkPageBound(12);
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text(proj.name, leftMargin, y);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(`${proj.startDate} – ${proj.endDate}`, rightMargin, y, {
               align: "right",
            });
            y += 6;

            proj.bullets?.forEach((bulletText) => {
               addBulletRow("", bulletText, false);
            });

            if (proj.technologies?.length) {
               addBulletRow("Technologies: ", proj.technologies.join(", "));
            }
            y += 1.5;
         });
      }

      if (cv.education && cv.education.length > 0) {
         addSectionHeader("Education");
         cv.education.forEach((edu) => {
            checkPageBound(12);
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text(edu.university, leftMargin, y);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(`${edu.startDate} – ${edu.endDate}`, rightMargin, y, {
               align: "right",
            });
            y += 5;

            addBodyParagraph(
               `${edu.degree}${edu.major ? ` — ${edu.major}` : ""}`,
               10,
               false,
               5,
            );
            y += 2;
         });
      }

      if (cv.certifications && cv.certifications.length > 0) {
         addSectionHeader("Certifications");
         cv.certifications.forEach((cert) => {
            checkPageBound(6);
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.text(`${cert.name} — ${cert.issuer}`, leftMargin, y);
            pdf.text(cert.date, rightMargin, y, { align: "right" });
            y += 5.5;
         });
      }

      if (cv.languages && cv.languages.length > 0) {
         addSectionHeader("Languages");
         addBodyParagraph(cv.languages.join(", "), 10, false, 5);
      }

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

            {cv.languages && cv.languages.length > 0 && (
               <CVSection title="LANGUAGES">
                  <p>{cv.languages.join(", ")}</p>
               </CVSection>
            )}
         </div>

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
