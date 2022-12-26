import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './types';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  users: User[] = []
  uri = "http://localhost:8010/api/auth";

  loggedIn: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  signupUser(first_name: string, last_name: string, email: string, password: string): Observable<any> {
    const queryParams = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }
    return this.http.post<any>(`${this.uri}/register`, queryParams, this.httpOptions);
  }

  logIn(queryParams: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.uri}/login`, queryParams, this.httpOptions);
  }

  logOut(){
    this.loggedIn = false;
  }

  isAdmin(user: User){
    const isUserAdmin = new Promise<boolean>(
      (resolve, reject) => {
        resolve(user.role === 'admin');
      }
    );
    return isUserAdmin;
  }

  isLogged(){
    const isLogged = new Promise<boolean>(
      (resolve, reject) => {
        resolve(this.loggedIn);
      }
    );
    return isLogged;
  }
}
