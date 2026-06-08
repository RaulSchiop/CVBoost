export interface PDFInputPropsType {
   toggle: boolean;
   settoggleOpen?: (seter: boolean) => void;
   resumes?: Resume[]; 
}

export interface Resume {
   id: number;
   name: string;
   createdDate: string;
   atsScore: number;
}

export interface ResumeItem {
   fileName: string;
   uploadedAt: string;
   atsScore: number | null;
   downloadUrl: string;
}
