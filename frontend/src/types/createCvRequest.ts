export interface Experience {
   company: string;
   role: string;
   startDate: string;
   endDate: string;
   description: string;
}

export interface Project {
   name: string;
   startDate: string;
   endDate: string;
   description: string;
   technologies: string;
}

export interface Education {
   university: string;
   degree: string;
   major?: string;
   startDate: string;
   endDate: string;
}

export interface Certification {
   name: string;
   issuer: string;
   date: string;
}

export interface Skills {
   languages?: string;
   databases?: string;
   frameworks?: string;
   tools?: string;
   other?: string;
}

export interface CVForm {
   name: string;
   email: string;
   phone: string;
   location: string;

   linkedin?: string;
   github?: string;
   website?: string;

   targetRole: string;
   targetCompany?: string;

   summary?: string;
   skills?: Skills;
   experience?: Experience[];
   projects?: Project[];
   education?: Education[];
   certifications?: Certification[];
   languages?: string[];
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
   skills?: {
      languages?: string[];
      databases?: string[];
      frameworks?: string[];
      tools?: string[];
      other?: string[];
   };
   experience?: {
      company: string;
      role: string;
      startDate: string;
      endDate: string;
      bullets: string[];
   }[];
   projects?: {
      name: string;
      startDate: string;
      endDate: string;
      bullets: string[];
      technologies: string[];
   }[];
   education?: {
      university: string;
      degree: string;
      major?: string;
      startDate: string;
      endDate: string;
   }[];
   certifications?: {
      name: string;
      issuer: string;
      date: string;
   }[];
   languages?: string[];
}
