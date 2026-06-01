export interface GeneratedSkills {
   languages: string[];
   databases: string[];
   frameworks: string[];
   tools: string[];
   other: string[];
}

export interface GeneratedExperience {
   company: string;
   role: string;
   startDate: string;
   endDate: string;
   bullets: string[];
}

export interface GeneratedProject {
   name: string;
   startDate: string;
   endDate: string;
   bullets: string[];
   technologies: string[];
}

export interface GeneratedEducation {
   university: string;
   degree: string;
   major?: string;
   startDate: string;
   endDate: string;
}

export interface GeneratedCertification {
   name: string;
   issuer: string;
   date: string;
}

export interface CVGenerated {
   name: string;
   email: string;
   phone: string;
   location: string;
   linkedin?: string;
   github?: string;
   website?: string;
   summary?: string;
   skills?: GeneratedSkills;
   experience?: GeneratedExperience[];
   projects?: GeneratedProject[];
   education?: GeneratedEducation[];
   certifications?: GeneratedCertification[];
   languages?: string[];
}