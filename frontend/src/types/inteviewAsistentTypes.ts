export interface Topic {
   name: string;
   description: string;
   priority: string;
   details: string[];
}

export interface TopicResponse {
   role: string;
   seniority: string;
   topics: Topic[];
}

export interface Question {
   question: string;
   options: string[];
   correctAnswer: number;
   explanation: string;
}

export interface QuestionResponse {
   questions: Question[];
}
