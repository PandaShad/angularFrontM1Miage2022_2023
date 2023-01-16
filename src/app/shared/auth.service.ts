import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { LoginRequest } from './types';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  user: User | null;
  uri = "http://localhost:8010/api/auth";

  loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {
    this._isLoggedIn$.next(!!this.tokenService.getToken());
    this.user = this.getUser(this.tokenService.getToken());
  }

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
    return this.http.post<any>(`${this.uri}/login`, queryParams, this.httpOptions).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(true);
      })
    );
  }

  private getUser(token: string | null): User | null {
    if(!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }

  logOut(){
    this.tokenService.logout();
    return this.http.post<any>(`${this.uri}/logout`, this.httpOptions).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(false);
      })
    );
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
