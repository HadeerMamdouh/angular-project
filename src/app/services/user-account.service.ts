import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { Observable } from 'rxjs';
import { UserExamResult } from '../models/userExamResult';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient) { }

  // get all exam results
  getAllExamResults(): Observable<UserExamResult[]>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserExamResult[]>(API_ENDPOINTS.GET_USER_EXAMS, {headers: headers});
  }

  getExamResult(examId:number) : Observable<UserExamResult>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserExamResult>(API_ENDPOINTS.GET_USER_EXAM_RESULT(examId), {headers: headers});
  }

  // take part in exam
  takePartInExam(examId:number) : Observable<any>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let data = {};
    return this.http.post<any>(API_ENDPOINTS.POST_USER_TAKE_EXAM(examId), data, {headers: headers});
  }

  // submit exam's answers
  submitExamAnswers(examId: number, answers: any[]): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const data = answers.map((answer) => ({
    questionId: answer["questionId"],
    selectedChoiceId: answer["selectedChoiceId"]
  }));
  return this.http.post<any>(API_ENDPOINTS.PUT_USER_SUBMIT_ANSWERS(examId), data, { headers });
}



  // get all available exams
  getAllAvailableExams(): Observable<Exam[]>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Exam[]>(API_ENDPOINTS.GET_USER_AVAILABLE_EXAMS, {headers: headers});
  }

}
