import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from './models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };
  
  constructor(
    private http: HttpClient
  ) { }

  uri = "http://localhost:8010/api/subjects/"

  getSubjects(): Observable<any> {
    return this.http.get<any>(this.uri);
  }

  addSubject(subject: Subject): Observable<any> {
    return this.http.post<Subject>(this.uri, subject,this.httpOptions)
  }

  updateSubject(subject: Subject): Observable<any> {
    return this.http.put<Subject>(this.uri, subject);
  }

  deleteSubject(subject: Subject): Observable<any> {
    return this.http.delete<Subject>(`${this.uri}${subject.name}`);
  }
}