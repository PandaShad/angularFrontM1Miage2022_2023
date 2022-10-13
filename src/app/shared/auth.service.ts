import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;

  constructor() { }

  logIn(){
    this.loggedIn = true; 
  }

  logOut(){
    this.loggedIn = false;
  }

  isAdmin(){
    const isUserAdmin = new Promise<boolean>(
      (resolve, reject) => {
        resolve(this.loggedIn);
      }
    );
    return isUserAdmin;
  }
}
