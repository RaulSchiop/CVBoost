export interface Job {
   email: string;
   company: string;
   position: string;
   seniority: "";
   applicationDate: string;
   status: Status;
   sk: string;
}

export type Status =
   | "saved" // job bookmarked, not applied yet
   | "applied" // application sent
   | "interview" // interview scheduled / in progress
   | "offer" // offer received
   | "accepted" // offer accepted
   | "rejected"
  
