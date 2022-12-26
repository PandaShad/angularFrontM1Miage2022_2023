import { Injectable } from "@angular/core";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    logout(): void {
        localStorage.clear();
    }

    saveToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }
    
    saveUser(user: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    
    getUser(): any {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
          return JSON.parse(user);
        }
        return {};
    }
}