import { Injectable } from "@angular/core";
import * as moment from "moment";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EXPIRES_AT = 'auth-expiresAt'

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    logout(): void {
        localStorage.clear();
    }

    saveToken(token: string, expiresIn: number): void {
        const expiresAt = moment().add(expiresIn, 'second');
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(EXPIRES_AT, expiresAt.valueOf().toString());
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

    isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    getExpiration() {
        const expiration = localStorage.getItem(EXPIRES_AT)!;
        return moment(JSON.parse(expiration));
    }
}