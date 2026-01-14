export interface Job {
   id: number;
   title: string;
   position: string;
   seniority: "junior" | "mid" | "senior";
   date: string;
   status: Status;
}

export type Status =
   | "saved" // job bookmarked, not applied yet
   | "applied" // application sent
   | "interview" // interview scheduled / in progress
   | "offer" // offer received
   | "accepted" // offer accepted
   | "rejected";
