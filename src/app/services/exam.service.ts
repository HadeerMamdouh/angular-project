import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { Question } from '../models/question';
import { UserExamResult } from '../models/userExamResult';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  getAllExams() : Observable<Exam[]>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Exam[]>(API_ENDPOINTS.GET_All_EXAMS, {headers: headers});
  }

  getExamById(examId:number) : Observable<Exam>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Exam>(API_ENDPOINTS.GET_EXAM(examId), {headers: headers});
  }

  getExamQuestions(examId:number): Observable<Question[]>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Question[]>(API_ENDPOINTS.GET_EXAM_QUESTIONS(examId), {headers: headers}); 
  }

  addExam(newExam:any) : Observable<any>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let data = {
      "name": newExam.name,
      "durationInMinutes": newExam.durationInMinutes,
      "questions": newExam.questions,
    };

    return this.http.post<any>(API_ENDPOINTS.POST_EXAM,  data, {headers: headers});
  }


  // delete exam
  deleteExam(examId:number) : Observable<any>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(API_ENDPOINTS.DELETE_EXAM(examId), {headers: headers});
  }


  getExamResults(examId:number) : Observable<UserExamResult[]>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserExamResult[]>(API_ENDPOINTS.GET_EXAM_RESULTS(examId), {headers: headers});
  }

  updateExam(examId:number, updatedExam:any) : Observable<any>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let data = {
      "name": updatedExam.name,
      "durationInMinutes": updatedExam.durationInMinutes,
      "questions": updatedExam.questions,
    };

    return this.http.put<any>(API_ENDPOINTS.PUT_EXAM(examId), data, {headers: headers});
  }

  getExamHasResults(examId:number) : Observable<any>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(API_ENDPOINTS.GET_EXAM_HAS_RESULTS(examId), {headers: headers});
  }

}
