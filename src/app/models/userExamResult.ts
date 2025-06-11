import { Exam } from "./exam";
import { UserAnswer } from "./userAnswer";

export class UserExamResult {
  id: number;
  userId: string;
  examId: number;
  exam!: Exam;
  score: number;
  status: number;
  dateTaken: Date;
  userName!: string;
  userEmail!: string;
  userAnswers: UserAnswer[];

  constructor({
    id = 0,
    userId = '',
    examId = 0,
    score = 0,
    status = 0,
    dateTaken = new Date(),
    userName = '',
    userEmail = '',
    userAnswers = [],
    exam,
  }: Partial<UserExamResult>) {
    this.id = id;
    this.userId = userId;
    this.examId = examId;
    this.score = score;
    this.status = status;
    this.dateTaken = new Date(dateTaken);
    this.userName = userName;
    this.userEmail = userEmail;
    this.exam = Exam.fromJson(exam);
    this.userAnswers = userAnswers.map(ua => UserAnswer.fromJson(ua));
  }

  static fromJson(data: any): UserExamResult {
    return new UserExamResult({
      id: data['id'],
      userId: data['userId'],
      examId: data['examId'],
      score: data['score'],
      status: data['status'],
      dateTaken: data['dateTaken'],
      userName: data['user']?.['userName'] ?? '',
      userEmail: data['user']?.['email'] ?? '',
      userAnswers: data['userAnswers'] || [],
      exam: data['exam'],
    });
  }

}
