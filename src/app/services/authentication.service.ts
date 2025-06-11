import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }

  login(credentials : {userName:string, password:string}): Observable<any>{
    return this.http.post(API_ENDPOINTS.LOGIN, credentials);
  }

  register(userData: {userName:string, email:string, password:string}): Observable<any>{
    return this.http.post(API_ENDPOINTS.REGISTER, userData);
  }
  
  getUserData() : Observable<any>{
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(API_ENDPOINTS.GET_USER,{headers: headers});
  }
}
