const baseUrl = "https://quizcraft.runasp.net/api";
export const API_ENDPOINTS = {

  //////////////////////// Authentications APIs ////////////////////////

  LOGIN: `${baseUrl}/Account/login`,
  REGISTER: `${baseUrl}/Account/register`,


  //////////////////////// Admin APIs ////////////////////////

  GET_USER: `${baseUrl}/user`,
  GET_All_EXAMS: `${baseUrl}/Exam/all`,
  GET_EXAM: (examId:number) => `${baseUrl}/Exam/${examId}`,
  GET_EXAM_QUESTIONS: (examId:number) => `${baseUrl}/Exam/questions/${examId}`,
  GET_EXAM_RESULTS: (examId:number) => `${baseUrl}/Exam/results/${examId}`,
  GET_EXAM_HAS_RESULTS: (examId:number) => `${baseUrl}/Exam/has-results/${examId}`,

  POST_EXAM: `${baseUrl}/Exam`,

  PUT_EXAM: (examId:number) => `${baseUrl}/Exam/${examId}`,
  
  DELETE_EXAM: (examId:number) => `${baseUrl}/Exam/${examId}`,


  //////////////////////// User APIs ////////////////////////

  GET_USER_EXAMS: `${baseUrl}/User/exam-results`,
  GET_USER_EXAM_RESULT: (examId:number) => `${baseUrl}/User/exam-result/${examId}`,
  GET_USER_AVAILABLE_EXAMS: `${baseUrl}/User/available-exams`,

  POST_USER_TAKE_EXAM: (examId:number) => `${baseUrl}/User/take-exam/${examId}`,

  PUT_USER_SUBMIT_ANSWERS: (examId:number) => `${baseUrl}/User/submit-answer/${examId}`,
};
