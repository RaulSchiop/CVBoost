export interface PDFInputPropsType {
   toggle: boolean;
   settoggleOpen?: (seter: boolean) => void;
   resumes: Resume[]; //to be changed when i build the db
}

export interface Resume {
   id: number;
   name: string;
   createdDate: string;
   atsScore: number;
}
