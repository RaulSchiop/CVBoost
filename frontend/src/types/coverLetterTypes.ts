export interface InputCoverLetter {
   toggle: boolean;
   coverLetters: CoverLetter[];
}

export interface CoverLetter {
   id: number;
   name: string;
   Company: string;
   jobTitle: string;
   jobDescription: string;
   createdDate: string;
}
