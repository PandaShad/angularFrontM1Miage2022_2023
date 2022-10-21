import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [
    {
    login: 'admin',
    password: 'admin',
    role: 'admin'
    },
    {
      login: 'LilShad',
      password: '123',
      role: 'admin'
    },
    {
      login: 'test.user',
      password: '123',
      role: 'user'
    },
  ]

  loggedIn: boolean = false;

  constructor() { }

  logIn(){
    this.loggedIn = true; 
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
