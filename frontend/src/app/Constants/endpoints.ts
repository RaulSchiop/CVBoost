const HOST = "http://localhost:8080";
const API_VERSION = "/api/v1";

//AiAsistent endpoints

export const TOPIC_ENDPOINT = HOST + API_VERSION + "/AiAsistent/topics"; //POST ENDPOINT
export const QUESTION_ENDPOINT = HOST + API_VERSION + "/AiAsistent/questions"; //POST ENDPOINT

export const AI_RESUME_REVIEW_ENDPOINT =
   HOST + API_VERSION + "/AiResume/review"; //POST ENDPOINT
export const AI_RESUME_REVIEW_UPDATE =
   HOST + API_VERSION + "/AiResume/updateScore";

//Auth endpoints
export const CREATE_USER_ENDPOINT = HOST + API_VERSION + "/auth/createAccount"; //POST ENDPOINT
export const LOG_IN_USER_ENDPOINT = HOST + API_VERSION + "/auth/login"; //POST ENDPOINT

//Application endpoints
export const CREATE_APPLICATION_ENDPOINT =
   HOST + API_VERSION + "/application/createApplication"; //POST ENDPOINT
export const UPDATE_APPLICATION_STATUS_ENDPOINT =
   HOST + API_VERSION + "/application/updateStatus"; //POST ENDPOINT
export const GET_APPLICATION_ENDPOINT =
   HOST + API_VERSION + "/application/getApplications"; //GET ENDPOINT

//Create Resume
export const CREATE_RESUME_ENDPOINT =
   HOST + API_VERSION + "/createResume/create"; //POST ENDPOINT
export const DELETE_RESUME_ENDPOINT =
   HOST + API_VERSION + "/createResume/delete"; //POST ENDPOINT

//save resume
export const SAVE_RESUME_ENDPOINT = HOST + API_VERSION + "/createResume/save"; //POST ENDPOINT

//getResumes
export const GET_RESUMES = HOST + API_VERSION + "/resume/getResumes/"; //GET ENDPOINT

//createCoverLetter
export const CREATE_COVERLETTER =
   HOST + API_VERSION + "/createCoverLetter/create";
